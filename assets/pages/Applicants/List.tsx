// pages/Applicants/List.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../components/axiosClient';

interface Appointment {
    id: number;
    title: string;
    start_time: string;
    end_time: string;
    participant: any;
}

const ApplicantsList: React.FC = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get('/appointments');
            setAppointments(response.data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this appointment?')) return;
        try {
            await axios.delete(`/appointments/${id}`);
            setAppointments(appointments.filter(a => a.id !== id));
        } catch (error) {
            console.error('Error deleting appointment:', error);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Applicants (Appointments)</h3>
                <Link to="/applicants/create" className="btn btn-primary">Create</Link>
            </div>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Participant ID</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {appointments.map(app => (
                    <tr key={app.id}>
                        <td>{app.id}</td>
                        <td>{app.title}</td>
                        <td>{app.start_time}</td>
                        <td>{app.end_time}</td>
                        <td>{app.participant.name}</td>
                        <td>
                            <Link to={`/applicants/${app.id}`} className="btn btn-sm btn-info me-1">View</Link>
                            <Link to={`/applicants/${app.id}/edit`} className="btn btn-sm btn-warning me-1">Edit</Link>
                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(app.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ApplicantsList;
