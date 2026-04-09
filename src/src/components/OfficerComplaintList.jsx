import { useState } from 'react';
import api from '../services/api';

const OfficerComplaintList = ({ complaints, onUpdate }) => {
    const [selectedComplaintId, setSelectedComplaintId] = useState(null);
    const [status, setStatus] = useState('');
    const [proof, setProof] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        const formData = new FormData();
        formData.append('complaintId', selectedComplaintId);
        formData.append('status', status);
        if (proof) {
            formData.append('proof', proof);
        }

        try {
            await api.put('/officer/update-status', formData);
            alert('Status updated successfully');
            onUpdate();
            setSelectedComplaintId(null);
            setStatus('');
            setProof(null);
        } catch (error) {
            alert(error.response?.data?.message || 'Error updating status');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="officer-complaint-list">
            <h3>{complaints.length > 0 && complaints[0].status === 'Resolved' ? 'Completed Tasks' : 'Active Tasks'}</h3>
            {complaints.length === 0 ? <p>No complaints found.</p> : (
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Proof</th>
                            <th>Location</th>
                            <th>User</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {complaints.map((complaint) => (
                            <tr key={complaint._id}>
                                <td>{complaint.title}</td>
                                <td>{complaint.category}</td>
                                <td>{complaint.status}</td>
                                <td>
                                    {complaint.proofImage ? (
                                        <a href={`https://urban-village-backend.onrender.com/${complaint.proofImage}`} target="_blank" rel="noopener noreferrer">
                                            <img
                                                src={`https://urban-village-backend.onrender.com/${complaint.proofImage}`}
                                                alt="Proof"
                                                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                            />
                                        </a>
                                    ) : 'N/A'}
                                </td>
                                <td>{Math.round(complaint.location.latitude * 100) / 100}, {Math.round(complaint.location.longitude * 100) / 100}</td>
                                <td>{complaint.userId?.name} ({complaint.userId?.phone})</td>
                                <td>
                                    {complaint.status !== 'Resolved' && (
                                        <button onClick={() => {
                                            setSelectedComplaintId(complaint._id);
                                            setStatus(complaint.status);
                                        }}>
                                            Update
                                        </button>
                                    )}
                                    {selectedComplaintId === complaint._id && (
                                        <div className="update-form">
                                            <form onSubmit={handleUpdate}>
                                                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                                    <option value="Pending">Pending</option>
                                                    <option value="In Progress">In Progress</option>
                                                    <option value="Resolved">Resolved</option>
                                                </select>
                                                <input
                                                    type="file"
                                                    onChange={(e) => setProof(e.target.files[0])}
                                                />
                                                <button type="submit" disabled={submitting}>
                                                    {submitting ? 'Saving...' : 'Save'}
                                                </button>
                                                <button type="button" onClick={() => setSelectedComplaintId(null)}>Cancel</button>
                                            </form>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default OfficerComplaintList;
