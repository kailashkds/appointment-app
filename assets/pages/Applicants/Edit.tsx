import React, { useEffect, useState } from 'react';
import axios from '../../components/axiosClient';
import { useNavigate, useParams, Link } from 'react-router-dom';

interface Participant {
    id: number;
    name: string;
    email: string;
}

interface ValidationErrors {
    title?: string;
    start_time?: string;
    end_time?: string;
    participant_id?: string;
}

const ApplicantsEdit: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [participantId, setParticipantId] = useState<number | ''>('');
    const [errors, setErrors] = useState<ValidationErrors>({});

    useEffect(() => {
        axios.get('participants').then(res => setParticipants(res.data));
        axios.get(`/appointments/${id}`).then(res => {
            const data = res.data;
            setTitle(data.title);
            setStartTime(formatForInput(data.start_time));
            setEndTime(formatForInput(data.end_time));
            setParticipantId(data.participant.id);
        });
    }, [id]);

    const formatForInput = (datetime: string) => {
        return datetime.replace(' ', 'T');
    };

    const formatDateTime = (datetime: string) => {
        const date = new Date(datetime);
        const pad = (n: number) => n.toString().padStart(2, '0');
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
            `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({}); // Reset previous errors
        try {
            await axios.put(`/appointments/${id}`, {
                title,
                start_time: formatDateTime(startTime),
                end_time: formatDateTime(endTime),
                participant_id: participantId
            });
            navigate('/applicants');
        } catch (error: any) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else if (error.response?.data?.error?.error === 'Appointment overlaps with an existing one') {
                setErrors({ end_time: 'Appointment overlaps with an existing one' });
            } else {
                setErrors({ title: 'Something went wrong. Please try again.' });
            }
        }
    };

    return (
        <div>
            <h3>Edit Appointment</h3>
            {errors.end_time && <div className="alert alert-danger">{errors.end_time}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Start Time</label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        value={startTime}
                        onChange={e => setStartTime(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>End Time</label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        value={endTime}
                        onChange={e => setEndTime(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Participant</label>
                    <select
                        className="form-control"
                        value={participantId}
                        onChange={e => setParticipantId(Number(e.target.value))}
                        required
                    >
                        <option value="">Select a participant</option>
                        {participants.map(p => (
                            <option key={p.id} value={p.id}>
                                {p.name} ({p.email})
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary me-2">Update</button>
                <Link to="/applicants" className="btn btn-secondary">Back</Link>
            </form>
        </div>
    );
};

export default ApplicantsEdit;
