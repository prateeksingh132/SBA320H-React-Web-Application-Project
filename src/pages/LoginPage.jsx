import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // logic: pass the form data to our context login function
        login(username, password);
        navigate('/dashboard'); // put them to the dashboard after logging in
    };

    return (
        <div className="main_container">
            {/* logic: reusing the card class from my css to make a quick form box */}
            <div className="card" style={{ margin: '40px auto', textAlign: 'center' }}>
                <h2 style={{ color: '#003366' }}>sign in</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="username"
                        required
                        style={{ padding: '10px' }}
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="password"
                        required
                        style={{ padding: '10px' }}
                    />
                    <button type="submit" className="btn">login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;