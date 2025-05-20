import React, { useEffect, useState } from 'react';
import axios from '../../components/axiosClient';
import { useParams, } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const ParticipantView: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [participant, setParticipant] = useState<{ name: string; email: string }>({ name: '', email: '' });
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`/participants/${id}`).then(res => {
            setParticipant(res.data);
        });
    }, [id]);

    return (
        <div>
            <h3>Participant Details</h3>
            <p><strong>Name:</strong> {participant.name}</p>
            <p><strong>Email:</strong> {participant.email}</p>
            <button className="btn btn-secondary" onClick={() => navigate('/participants')}>Back</button>
        </div>
    );
};

export default ParticipantView;
