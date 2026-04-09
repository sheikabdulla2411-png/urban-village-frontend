import { useState, useEffect } from 'react';
import api from '../services/api';
import Sidebar from '../components/Sidebar';
import CreateOfficerForm from '../components/CreateOfficerForm';

const AdminEmployees = () => {
    const [officers, setOfficers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOfficers();
    }, []);

    const fetchOfficers = async () => {
        try {
            const { data } = await api.get('/admin/users');
            // Filter for officers (employees)
            const employees = data.filter(user => user.role === 'officer');
            setOfficers(employees);
        } catch (error) {
            console.error("Error fetching officers:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard-layout">
            <Sidebar role="admin" activeTab="employees" />
            <div className="dashboard-main">
                <header className="dashboard-header">
                    <h2>Manage Employees</h2>
                </header>
                <div className="dashboard-content">
                    <CreateOfficerForm />
                    <hr className="divider" />
                    <h3>Existing Officers</h3>
                    <div className="card-container">
                        {loading ? <p>Loading...</p> : officers.length === 0 ? <p>No employees found.</p> : (
                            officers.map(officer => (
                                <div key={officer._id} className="user-card officer-card">
                                    <div className="card-header">
                                        <h3>{officer.name}</h3>
                                        <span className="badge officer">{officer.role}</span>
                                    </div>
                                    <div className="card-body">
                                        <p><strong>Email:</strong> {officer.email}</p>
                                        <p><strong>Phone:</strong> {officer.phone}</p>
                                        <p><strong>Joined:</strong> {new Date(officer.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminEmployees;
