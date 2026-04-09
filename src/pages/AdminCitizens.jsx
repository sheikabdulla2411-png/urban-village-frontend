import { useState, useEffect } from 'react';
import api from '../services/api';
import Sidebar from '../components/Sidebar';

const AdminCitizens = () => {
    const [citizens, setCitizens] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCitizens();
    }, []);

    const fetchCitizens = async () => {
        try {
            const { data } = await api.get('/admin/users');
            // Filter for users (citizens)
            const users = data.filter(user => user.role === 'user');
            setCitizens(users);
        } catch (error) {
            console.error("Error fetching citizens:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard-layout">
            <Sidebar role="admin" activeTab="citizens" />
            <div className="dashboard-main">
                <header className="dashboard-header">
                    <h2>Manage Citizens</h2>
                </header>
                <div className="dashboard-content">
                    <div className="user-list">
                        <div className="card-container">
                            {loading ? <p>Loading...</p> : citizens.length === 0 ? <p>No citizens found.</p> : (
                                citizens.map(u => (
                                    <div key={u._id} className="user-card">
                                        <p><strong>Name:</strong> {u.name}</p>
                                        <p><strong>Email:</strong> {u.email}</p>
                                        <p><strong>Phone:</strong> {u.phone}</p>
                                        <p><strong>Role:</strong> <span className={`badge ${u.role}`}>{u.role}</span></p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminCitizens;
