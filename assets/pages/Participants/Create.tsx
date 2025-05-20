import React, { useState } from 'react';
import axios from '../../components/axiosClient';
import { useNavigate } from 'react-router-dom';

const ParticipantCreate: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState<{ name?: string; email?: string; general?: string }>({});
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        try {
            await axios.post('/participants', { name, email });
            navigate('/participants');
        } catch (error: any) {
            const err = error.response?.data?.error || error.response?.data?.errors;

            if (typeof err === 'object') {
                setErrors({
                    name: err.name,
                    email: err.email,
                    general: !err.name && !err.email ? 'Validation error occurred' : undefined,
                });
            } else {
                setErrors({ general: 'An unexpected error occurred.' });
            }
        }
    };

    return (
        <div>
            <h3>Create Participant</h3>
            {errors.general && (
                <div className="alert alert-danger">
                    {errors.general}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Name</label>
                    <input
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        type="email"
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <button className="btn btn-success">Save</button>
                <button
                    type="button"
                    className="btn btn-secondary"
                    style={{ marginLeft: '20px' }}
                    onClick={() => navigate('/participants')}
                >
                    Back
                </button>
            </form>
        </div>
    );
};

export default ParticipantCreate;
