import { useState } from 'react';
import api from '../services/api';

const ComplaintList = ({ complaints }) => {
    const [feedbackData, setFeedbackData] = useState({ rating: 5, comment: '' });
    const [selectedComplaintId, setSelectedComplaintId] = useState(null);

    const handleFeedbackSubmit = async (e, complaintId) => {
        e.preventDefault();
        try {
            await api.post('/feedback', {
                complaintId,
                rating: feedbackData.rating,
                comment: feedbackData.comment,
            });
            alert('Feedback submitted');
            setSelectedComplaintId(null);
            setFeedbackData({ rating: 5, comment: '' });
        } catch (error) {
            alert(error.response?.data?.message || 'Error submitting feedback');
        }
    };

    return (
        <div className="complaint-list">
            <h3>{complaints.length > 0 && complaints[0].status === 'Resolved' ? 'Complaint History' : 'Active Complaints'}</h3>
            {complaints.length === 0 ? <p>No complaints found.</p> : (
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Proof</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {complaints.map((complaint) => (
                            <tr key={complaint._id}>
                                <td>{complaint.title}</td>
                                <td>{complaint.category}</td>
                                <td>
                                    <span className={`status-${complaint.status.toLowerCase().replace(' ', '-')}`}>
                                        {complaint.status}
                                    </span>
                                </td>
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
                                <td>{new Date(complaint.createdAt).toLocaleDateString()}</td>
                                <td>
                                    {complaint.status === 'Resolved' && (
                                        <button onClick={() => setSelectedComplaintId(complaint._id)}>
                                            Give Feedback
                                        </button>
                                    )}
                                    {selectedComplaintId === complaint._id && (
                                        <div className="feedback-form">
                                            <form onSubmit={(e) => handleFeedbackSubmit(e, complaint._id)}>
                                                <label>Rating:</label>
                                                <select
                                                    value={feedbackData.rating}
                                                    onChange={(e) => setFeedbackData({ ...feedbackData, rating: e.target.value })}
                                                >
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                </select>
                                                <input
                                                    type="text"
                                                    placeholder="Comment"
                                                    value={feedbackData.comment}
                                                    onChange={(e) => setFeedbackData({ ...feedbackData, comment: e.target.value })}
                                                />
                                                <button type="submit">Submit</button>
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

export default ComplaintList;
