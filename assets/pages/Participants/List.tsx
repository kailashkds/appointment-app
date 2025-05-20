import React, { useEffect, useState } from 'react';
import axios from '../../components/axiosClient';
import { useNavigate } from 'react-router-dom';

interface Participant {
    id: number;
    name: string;
    email: string;
}

const ParticipantList: React.FC = () => {
    const [participants, setParticipants] = useState<Participant[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchParticipants();
    }, []);

    const fetchParticipants = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/participants', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setParticipants(response.data);
        } catch (error) {
            console.error('Error fetching participants:', error);
        }
    };

    const handleCreate = () => {
        navigate('/participants/create');
    };

    const handleView = (id: number) => {
        navigate(`/participants/${id}`);
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Participants</h3>
                <button className="btn btn-primary" onClick={handleCreate}>Create Participant</button>
            </div>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {participants.map((participant) => (
                    <tr key={participant.id}>
                        <td>{participant.id}</td>
                        <td>{participant.name}</td>
                        <td>{participant.email}</td>
                        <td>
                            <button className="btn btn-info btn-sm me-2" onClick={() => handleView(participant.id)}>View</button>
                        </td>
                    </tr>
                ))}
                {participants.length === 0 && (
                    <tr>
                        <td colSpan={4} className="text-center">No participants found.</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default ParticipantList;
