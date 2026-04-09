import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/">Village GMS</Link>
            </div>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                {user ? (
                    <>
                        <li>
                            <Link to={
                                user.role === 'admin' ? '/admin' :
                                    user.role === 'officer' ? '/officer' :
                                        '/dashboard'
                            }>
                                Dashboard
                            </Link>
                        </li>
                        <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
