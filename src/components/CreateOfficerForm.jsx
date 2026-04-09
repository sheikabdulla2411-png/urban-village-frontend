import { useState } from 'react';
import api from '../services/api';

const CreateOfficerForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/admin/create-officer', formData);
            alert('Officer created successfully');
            setFormData({ name: '', email: '', password: '', phone: '' });
        } catch (error) {
            alert(error.response?.data?.message || 'Error creating officer');
        }
    };

    return (
        <div className="create-officer-form">
            <h3>Create New Officer</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Create Officer</button>
            </form>
        </div>
    );
};

export default CreateOfficerForm;
