import { Link } from 'react-router-dom';
import ResolvedGallery from '../components/ResolvedGallery';

const Home = () => {
    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1>Urban & Rural Village Development</h1>
                    <p>Your Voice, Our Action. A transparent platform for citizen grievances and feedback.</p>
                    <div className="hero-buttons">
                        <Link to="/register" className="btn btn-primary">Get Started</Link>
                        <Link to="/login" className="btn btn-secondary">Login</Link>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="about-section" id="about">
                <h2>About The System</h2>
                <p>
                    This Grievance Management System (GMS) bridges the gap between citizens and administration.
                    We provide a digital platform to report issues regarding roads, water, electricity, and sanitation,
                    ensuring timely resolution and transparency.
                </p>
            </section>

            {/* Impact Section - Resolved Complaints Gallery */}
            <section className="impact-section" id="impact">
                <h2>Our Impact</h2>
                <div className="features-grid">
                    <ResolvedGallery />
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section" id="features">
                <h2>Key Features</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <h3>Easy Reporting</h3>
                        <p>Submit complaints with geolocation in just a few clicks.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Real-time Tracking</h3>
                        <p>Monitor the status of your complaints from Pending to Resolved.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Proof of Work</h3>
                        <p>Officers upload images as proof before closing any issue.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Feedback Loop</h3>
                        <p>Rate the resolution quality to help us improve.</p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="contact-section" id="contact">
                <h2>Contact Us</h2>
                <p>Have questions? Reach out to the administration.</p>
                <div className="contact-details">
                    <p><strong>Email:</strong> admin@villagegms.com</p>
                    <p><strong>Phone:</strong> +91 123 456 7890</p>
                    <p><strong>Address:</strong> Village Panchayat Office, Main Road</p>
                </div>
            </section>
        </div>
    );
};

export default Home;
