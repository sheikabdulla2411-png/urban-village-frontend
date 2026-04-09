import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({ role, activeTab, setActiveTab }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h3>{role.charAt(0).toUpperCase() + role.slice(1)} Panel</h3>
            </div>
            <ul className="sidebar-menu">
                {role === 'user' && (
                    <>
                        <li
                            className={activeTab === 'create' ? 'active' : ''}
                            onClick={() => setActiveTab('create')}
                        >
                            New Complaint
                        </li>
                        <li
                            className={activeTab === 'active' ? 'active' : ''}
                            onClick={() => setActiveTab('active')}
                        >
                            Active Complaints
                        </li>
                        <li
                            className={activeTab === 'history' ? 'active' : ''}
                            onClick={() => setActiveTab('history')}
                        >
                            History
                        </li>
                        <li
                            className={activeTab === 'profile' ? 'active' : ''}
                            onClick={() => setActiveTab('profile')}
                        >
                            Edit Profile
                        </li>
                    </>
                )}

                {role === 'admin' && (
                    <>
                        <li
                            className={location.pathname === '/admin' ? 'active' : ''}
                            onClick={() => navigate('/admin')}
                        >
                            Manage Complaints
                        </li>
                        <li
                            className={location.pathname === '/admin/employees' ? 'active' : ''}
                            onClick={() => navigate('/admin/employees')}
                        >
                            Manage Officers
                        </li>
                        <li
                            className={location.pathname === '/admin/citizens' ? 'active' : ''}
                            onClick={() => navigate('/admin/citizens')}
                        >
                            Manage Citizens
                        </li>
                    </>
                )}

                {role === 'officer' && (
                    <>
                        <li
                            className={activeTab === 'assigned' ? 'active' : ''}
                            onClick={() => setActiveTab('assigned')}
                        >
                            Active Tasks
                        </li>
                        <li
                            className={activeTab === 'completed' ? 'active' : ''}
                            onClick={() => setActiveTab('completed')}
                        >
                            Completed Tasks
                        </li>
                        <li
                            className={activeTab === 'profile' ? 'active' : ''}
                            onClick={() => setActiveTab('profile')}
                        >
                            Edit Profile
                        </li>
                    </>
                )}
            </ul>
        </aside>
    );
};

export default Sidebar;
