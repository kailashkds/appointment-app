import React, { useEffect, useState } from 'react';
import axios from '../../components/axiosClient';
import { useParams, Link } from 'react-router-dom';

const ApplicantsView: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [applicant, setApplicant] = useState<any>(null);

    useEffect(() => {
        axios.get(`/appointments/${id}`).then(res => setApplicant(res.data));
    }, [id]);

    if (!applicant) return <div>Loading...</div>;

    return (
        <div>
            <h3>Appointment Details</h3>
            <p><strong>Title:</strong> {applicant.title}</p>
            <p><strong>Start Time:</strong> {applicant.start_time}</p>
            <p><strong>End Time:</strong> {applicant.end_time}</p>
            <p><strong>Participants:</strong> {applicant.participant.name} ({applicant.participant.email})</p>
            <Link to="/applicants" className="btn btn-secondary">Back</Link>
        </div>
    );
};

export default ApplicantsView;
