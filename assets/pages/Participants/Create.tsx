import React, { useState } from 'react';
import axios from '../../components/axiosClient';
import { useNavigate } from 'react-router-dom';

const ParticipantCreate: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await axios.post('/participants', { name, email });
        navigate('/participants');
    };

    return (
        <div>
            <h3>Create Participant</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Name</label>
                    <input className="form-control" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <button className="btn btn-success">Save</button>
                <button type="button" className="btn btn-secondary" style={{ marginLeft: '20px' }} onClick={() => navigate('/participants')}>Back</button>
            </form>
        </div>
    );
};

export default ParticipantCreate;
