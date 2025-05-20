import React from 'react';
import { BrowserRouter, Routes, Route, NavLink, Navigate, Outlet } from 'react-router-dom';
import ParticipantList from './pages/Participants/List';
import ParticipantCreate from './pages/Participants/Create';
import ParticipantView from './pages/Participants/View';
import ApplicantsList from './pages/Applicants/List';
import ApplicantsCreate from './pages/Applicants/Create';
import ApplicantsEdit from './pages/Applicants/Edit';
import ApplicantsView from './pages/Applicants/View';

import Home from './pages/Home';
import Login from './pages/Auth/Login';
import 'bootstrap/dist/css/bootstrap.min.css';


// ProtectedRoute inline
const ProtectedRoute: React.FC = () => {
    const token = localStorage.getItem('token');
    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

// Logout component
const Logout: React.FC = () => {
    React.useEffect(() => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }, []);
    return <div>Logging out...</div>;
};

const App: React.FC = () => {
    const token = localStorage.getItem('token');

    return (
        <BrowserRouter>
            <div className="container mt-4">
                <ul className="nav nav-tabs mb-4">
                    <li className="nav-item">
                        <NavLink to="/participants" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                            Participants
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/applicants" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                            Applicants
                        </NavLink>
                    </li>
                    {token && (
                        <li className="nav-item ms-auto">
                            <NavLink to="/logout" className="nav-link text-danger">
                                Logout
                            </NavLink>
                        </li>
                    )}
                </ul>

                <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/logout" element={<Logout />} />

                    {/* Protected Routes */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/participants" element={<ParticipantList />} />
                        <Route path="/participants/create" element={<ParticipantCreate />} />
                        <Route path="/participants/:id" element={<ParticipantView />} />
                        <Route path="/applicants" element={<ApplicantsList />} />
                        <Route path="/applicants/create" element={<ApplicantsCreate />} />
                        <Route path="/applicants/:id/edit" element={<ApplicantsEdit />} />
                        <Route path="/applicants/:id" element={<ApplicantsView />} />
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
