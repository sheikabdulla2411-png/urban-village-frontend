import { useState, useEffect } from 'react';
import api from '../services/api';

const ResolvedGallery = () => {
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        const fetchResolved = async () => {
            try {
                const { data } = await api.get('/public/resolved-complaints');
                setComplaints(data);
            } catch (error) {
                console.error("Error fetching resolved complaints", error);
            }
        };
        fetchResolved();
    }, []);

    if (complaints.length === 0) {
        return <p>No resolved complaints to show yet.</p>;
    }

    return (
        <>
            {complaints.map((complaint) => (
                <div key={complaint._id} className="feature-card" style={{ textAlign: 'left' }}>
                    <img
                        src={`http://localhost:5000/${complaint.proofImage}`}
                        alt="Proof"
                        style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px' }}
                    />
                    <h3>{complaint.title}</h3>
                    <p>{complaint.description.substring(0, 100)}...</p>
                    <small>Resolved on: {new Date(complaint.updatedAt).toLocaleDateString()}</small>
                </div>
            ))}
        </>
    );
};

export default ResolvedGallery;
