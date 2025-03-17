import React, { useState } from 'react';
import service from '../service';
import { useNavigate } from 'react-router-dom';
import '../style/Register.css'; // השתמש באותו קובץ CSS

const Login = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitClicked, setIsSubmitClicked] = useState(false);
    const navigate = useNavigate();

    async function LoginF() {
        const userId = await service.login(password);
        if (userId) {
            await service.getTasks(); // Refresh tasks list
            setIsSubmitClicked(true); // Enable the "see your tasks" button
        } else {
            setError('Login failed');
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!password) {
            setError('Password is required.');
            return;
        }
        LoginF();
        setPassword('');
    };

    return (
        <div className="form-container">
            
            {!isSubmitClicked ? (
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div>
                        <label>
                            Password:
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button type="submit">✅</button>
                </form>
            ) : (
                <button 
                    type="button" 
                    onClick={() => navigate('/App')}
                >
                    My Tasks
                </button>
            )}
        </div>
    );
};

export default Login;