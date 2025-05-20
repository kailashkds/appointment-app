import React, { useEffect, useState } from 'react';
import axios from '../../components/axiosClient';
import { useNavigate, Link } from 'react-router-dom';

interface Participant {
    id: number;
    name: string;
    email: string;
}

interface GeneralError {
    error?: string;
}
const ApplicantsCreate: React.FC = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [participantId, setParticipantId] = useState<number | ''>('');
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [generalError, setGeneralError] = useState('');
    useEffect(() => {
        axios.get('/participants')
            .then(res => setParticipants(res.data))
            .catch(err => console.error('Failed to fetch participants', err));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('/appointments', {
                title,
                start_time: formatDateTime(startTime),
                end_time: formatDateTime(endTime),
                participant_id: participantId
            });

            navigate('/applicants');
        } catch (error: any) {
            if (error.response && error.response.data) {
                const data = error.response.data;

                // Laravel returns errors in `error` or `errors` key
                if (data.errors) {
                    setErrors(data.errors);
                } else if (data.error) {
                    // General message like "Participant not found"
                    const general = typeof data.error === 'string' ? data.error : data.error.error;
                    setGeneralError(general);
                } else {
                    setGeneralError('An unexpected error occurred.');
                }
            } else {
                setGeneralError('Unable to connect to server.');
            }
        }
    };

    const formatDateTime = (datetime: string) => {
        const date = new Date(datetime);
        const pad = (n: number) => n.toString().padStart(2, '0');
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
            `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    };
    return (
        <div>
            <h3>Create Appointment</h3>
            {errors.start_time && <div className="alert alert-danger">{errors.start_time}</div>}
            {errors.end_time && <div className="alert alert-danger">{errors.end_time}</div>}
            {errors.error && <div className="alert alert-danger">{errors.error}</div>}
            {errors.participant_id && <div className="alert alert-danger">{errors.participant_id}</div>}
            {generalError && <div className="alert alert-danger">{generalError}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Title</label>
                    <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} required />
                </div>

                <div className="mb-3">
                    <label>Start Time</label>
                    <input type="datetime-local" className="form-control" value={startTime} onChange={e => setStartTime(e.target.value)} required />
                </div>

                <div className="mb-3">
                    <label>End Time</label>
                    <input type="datetime-local" className="form-control" value={endTime} onChange={e => setEndTime(e.target.value)} required />
                </div>

                <div className="mb-3">
                    <label>Participant</label>
                    <select className="form-control" value={participantId} onChange={e => setParticipantId(Number(e.target.value))} required>
                        <option value="">Select a participant</option>
                        {participants.map(p => (
                            <option key={p.id} value={p.id}>{p.name} ({p.email})</option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-success me-2">Save</button>
                <Link to="/applicants" className="btn btn-secondary">Back</Link>
            </form>
        </div>
    );
};

export default ApplicantsCreate;
