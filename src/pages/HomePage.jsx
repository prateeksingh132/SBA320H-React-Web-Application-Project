// testing: i am gonna buils a automatic image carousel that should change image smoothly

import HeroCarousel from '../components/HeroCarousel';

const HomePage = () => {
    ////////////TESTING
    // console.log('TESTING: homepage component is rendering');
    ////////////

    return (
        <div style={{ width: '100%' }}>

            <HeroCarousel />

            <div className="main_container" style={{ textAlign: 'center', marginTop: '40px' }}>
                <h2 style={{ color: '#003366' }}>Why Choose Us?</h2>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginTop: '20px', flexWrap: 'wrap' }}>
                    <div className="card" style={{ width: '250px' }}>
                        <h3>Fast Shipping</h3>
                        <p>Get your gadgets delivered in record time with our premium logistics network.</p>
                    </div>
                    <div className="card" style={{ width: '250px' }}>
                        <h3>24/7 Support</h3>
                        <p>Our tech experts are always online to help you troubleshoot any device.</p>
                    </div>
                    <div className="card" style={{ width: '250px' }}>
                        <h3>Best Prices</h3>
                        <p>We price match all major retailers to guarantee you the best deal possible.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;