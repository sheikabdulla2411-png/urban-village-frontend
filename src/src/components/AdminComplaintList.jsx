import { useState, useEffect } from 'react';
import api from '../services/api';

const AdminComplaintList = ({ complaints, officers, onAssign }) => {
    const [selectedOfficer, setSelectedOfficer] = useState({});

    const handleAssign = (complaintId) => {
        const officerId = selectedOfficer[complaintId];
        if (officerId) {
            onAssign(complaintId, officerId);
        } else {
            alert('Please select an officer');
        }
    };

    const handleOfficerSelect = (complaintId, officerId) => {
        setSelectedOfficer({ ...selectedOfficer, [complaintId]: officerId });
    };

    const [activeTab, setActiveTab] = useState('active');

    const filteredComplaints = complaints.filter(c => {
        if (activeTab === 'active') return c.status !== 'Resolved';
        return c.status === 'Resolved';
    });

    return (
        <div className="admin-complaint-list">
            <div className="tabs">
                <button
                    className={activeTab === 'active' ? 'active' : ''}
                    onClick={() => setActiveTab('active')}
                >
                    Active Complaints
                </button>
                <button
                    className={activeTab === 'resolved' ? 'active' : ''}
                    onClick={() => setActiveTab('resolved')}
                >
                    Resolved Complaints
                </button>
            </div>

            <h3>{activeTab === 'active' ? 'Active Complaints' : 'Resolved Complaints'}</h3>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Proof</th>
                        <th>Location</th>
                        <th>Assigned To</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredComplaints.map((complaint) => (
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
                            <td>{complaint.location.latitude}, {complaint.location.longitude}</td>
                            <td>
                                {complaint.officerId ? (
                                    complaint.officerId.name
                                ) : (
                                    <select
                                        onChange={(e) => handleOfficerSelect(complaint._id, e.target.value)}
                                        value={selectedOfficer[complaint._id] || ''}
                                    >
                                        <option value="">Select Officer</option>
                                        {officers.map((officer) => (
                                            <option key={officer._id} value={officer._id}>
                                                {officer.name}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </td>
                            <td>
                                {!complaint.officerId && (
                                    <button onClick={() => handleAssign(complaint._id)}>Assign</button>
                                )}
                                {/* Could add delete or change status manually here if needed */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminComplaintList;
