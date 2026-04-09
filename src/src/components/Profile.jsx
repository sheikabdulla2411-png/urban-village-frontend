import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const { user, login } = useAuth(); // Assuming login updates user context
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setPhone(user.phone);
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const { data } = await api.put('/auth/profile', {
                name,
                email,
                phone,
                password: password || undefined,
            });
            login(data); // Update context with new user data
            alert('Profile updated successfully');
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            alert(error.response?.data?.message || 'Error updating profile');
        }
    };

    return (
        <div className="profile-container">
            <h3>Edit Profile</h3>
            <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>New Password (leave blank to keep current)</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Confirm New Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default Profile;
