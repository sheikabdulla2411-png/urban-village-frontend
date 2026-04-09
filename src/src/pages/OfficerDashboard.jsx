import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import OfficerComplaintList from '../components/OfficerComplaintList';
import Sidebar from '../components/Sidebar';
import Profile from '../components/Profile';

const OfficerDashboard = () => {
    const { user } = useAuth();
    const [complaints, setComplaints] = useState([]);
    const [activeTab, setActiveTab] = useState('assigned');

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        try {
            const { data } = await api.get('/officer/complaints');
            setComplaints(data);
        } catch (error) {
            console.error(error);
        }
    };

    const getFilteredComplaints = () => {
        if (activeTab === 'assigned') {
            return complaints.filter(c => c.status !== 'Resolved');
        } else if (activeTab === 'completed') {
            return complaints.filter(c => c.status === 'Resolved');
        }
        return [];
    };

    return (
        <div className="dashboard-layout">
            <Sidebar role="officer" activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="dashboard-main">
                <header className="dashboard-header">
                    <h2>Officer Dashboard</h2>
                </header>
                <div className="dashboard-content">
                    {(activeTab === 'assigned' || activeTab === 'completed') && (
                        <OfficerComplaintList complaints={getFilteredComplaints()} onUpdate={fetchComplaints} />
                    )}
                    {activeTab === 'profile' && <Profile />}
                </div>
            </div>
        </div>
    );
};

export default OfficerDashboard;
