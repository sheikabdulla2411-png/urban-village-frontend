import { useState } from 'react';
import api from '../services/api';

const ComplaintForm = ({ onComplaintAdded }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Road',
        latitude: '',
        longitude: '',
    });
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setFormData({
                    ...formData,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const { data } = await api.post('/complaints', {
                ...formData,
                location: {
                    latitude: formData.latitude,
                    longitude: formData.longitude,
                },
            });
            onComplaintAdded(data);
            setFormData({
                title: '',
                description: '',
                category: 'Road',
                latitude: '',
                longitude: '',
            });
            alert('Complaint submitted successfully');
        } catch (error) {
            alert(error.response?.data?.message || 'Error submitting complaint');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="complaint-form">
            <h3>Submit a Complaint</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
                <select name="category" value={formData.category} onChange={handleChange}>
                    <option value="Road">Road</option>
                    <option value="Water">Water</option>
                    <option value="Electricity">Electricity</option>
                    <option value="Sanitation">Sanitation</option>
                    <option value="Others">Others</option>
                </select>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                        type="number"
                        name="latitude"
                        placeholder="Latitude"
                        value={formData.latitude}
                        onChange={handleChange}
                        required
                        readOnly
                    />
                    <input
                        type="number"
                        name="longitude"
                        placeholder="Longitude"
                        value={formData.longitude}
                        onChange={handleChange}
                        required
                        readOnly
                    />
                    <button type="button" onClick={getLocation}>Get Location</button>
                </div>
                <button type="submit" disabled={submitting}>
                    {submitting ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default ComplaintForm;
