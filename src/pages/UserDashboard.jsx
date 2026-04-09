import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import ComplaintForm from '../components/ComplaintForm';
import ComplaintList from '../components/ComplaintList';
import Sidebar from '../components/Sidebar';
import Profile from '../components/Profile';

const UserDashboard = () => {
    const { user } = useAuth();
    const [complaints, setComplaints] = useState([]);
    const [activeTab, setActiveTab] = useState('active');

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        try {
            const { data } = await api.get('/complaints/my');
            setComplaints(data);
        } catch (error) {
            console.error(error);
        }
    };

    const getFilteredComplaints = () => {
        if (activeTab === 'active') {
            return complaints.filter(c => c.status !== 'Resolved');
        } else if (activeTab === 'history') {
            return complaints.filter(c => c.status === 'Resolved');
        }
        return [];
    };

    const handleComplaintAdded = (newComplaint) => {
        setComplaints([newComplaint, ...complaints]);
        setActiveTab('active'); // Switch to active list view after submission
    };

    return (
        <div className="dashboard-layout">
            <Sidebar role="user" activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="dashboard-main">
                <header className="dashboard-header">
                    <h2>Welcome, {user.name}</h2>
                </header>
                <div className="dashboard-content">
                    {activeTab === 'create' && <ComplaintForm onComplaintAdded={handleComplaintAdded} />}
                    {(activeTab === 'active' || activeTab === 'history') && (
                        <ComplaintList complaints={getFilteredComplaints()} />
                    )}
                    {activeTab === 'profile' && <Profile />}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
