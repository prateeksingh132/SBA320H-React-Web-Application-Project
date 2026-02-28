import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer_container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                <div>
                    <h3 style={{ margin: '0 0 10px 0', color: '#ff6600' }}>GadgetShack</h3>
                    <p style={{ margin: 0, fontSize: '0.9rem' }}>&copy; 2026 GadgetShack Inc. All rights reserved.</p>
                </div>

                <div style={{ display: 'flex', gap: '15px' }}>
                    {/* i m gonna add some quick footer links that just route back to home for now */}
                    {/* FUTUREWORK: maybe create separate pages for these three links? or a floating info card? */}
                    <Link to="/" className="footer_link">Privacy Policy</Link>
                    <Link to="/" className="footer_link">Terms of Service</Link>
                    <Link to="/" className="footer_link">Contact Support</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;