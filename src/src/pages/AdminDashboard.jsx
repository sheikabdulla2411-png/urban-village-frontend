import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import AdminComplaintList from '../components/AdminComplaintList';
import Sidebar from '../components/Sidebar';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [complaints, setComplaints] = useState([]);
    const [officers, setOfficers] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const complaintsRes = await api.get('/admin/complaints');
            const usersRes = await api.get('/admin/users');
            setComplaints(complaintsRes.data);

            const allUsers = usersRes.data;
            setOfficers(allUsers.filter(u => u.role === 'officer'));
        } catch (error) {
            console.error(error);
        }
    };

    const handleAssignComplaint = async (complaintId, officerId) => {
        try {
            await api.put('/admin/assign-complaint', { complaintId, officerId });
            alert('Complaint assigned successfully');
            fetchData(); // Refresh data
        } catch (error) {
            alert('Error assigning complaint');
        }
    };

    return (
        <div className="dashboard-layout">
            <Sidebar role="admin" activeTab="complaints" />
            <div className="dashboard-main">
                <header className="dashboard-header">
                    <h2>Admin Control Panel</h2>
                </header>
                <div className="dashboard-content">
                    <AdminComplaintList
                        complaints={complaints}
                        officers={officers}
                        onAssign={handleAssignComplaint}
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
