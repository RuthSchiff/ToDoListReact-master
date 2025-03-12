import React, { useState } from 'react';
import service from '../service';
import { useNavigate } from 'react-router-dom';
import '../style/Register.css';

const Register = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!name || !password) {
            setError('Both fields are required.');
            return;
        }

        // ביטוי רגולרי לבדיקה שהסיסמה מכילה לפחות 10 תווים, כולל אותיות באנגלית או בעברית ומספרים
        const passwordRegex = /^(?=.*[A-Za-zא-ת])(?=.*\d)[A-Za-zא-ת\d]{10,}$/;
        if (!passwordRegex.test(password)) {
            setError('Password must be at least 10 characters long and contain both letters and numbers.');
            return;
        }

        try {
            const userId = await service.register(name, password);
            if (userId) {
                setName(''); // Clear name input
                setPassword(''); // Clear password input
                alert('Registration successful! 😊');
                navigate('/App');
            } else {
                setError('Registration failed');
            }
        } catch (error) {
            setError('Error registering user: ' + error.message);
        }
    };

    return (
        <div className="form-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                </div>
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
                <button type="submit">Register now</button>
             
            </form>
        </div>
    );
};

export default Register;