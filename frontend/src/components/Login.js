import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 

const Login = () => {
    // State hooks for managing user inputs
    const [username, setUsername] = useState(''); // For storing the username
    const [userRole, setUserRole] = useState('learner'); // For storing the selected role (learner or advisor)
    const [userPassword, setUserPassword] = useState(''); // For storing the password
    const navigate = useNavigate(); // Hook for navigation between routes

    // Function to handle the login process
    const handleLogin = () => {
        const credentials = { name: username, role: userRole, password: userPassword }; // Construct the login payload

        axios.post('http://localhost:5000/api/auth/login', credentials) // Make a POST request to the login endpoint
            .then(response => {
                alert('Successfully logged in!'); // Notify the user upon successful login
                navigate('/scheduler'); // Redirect to the scheduler page
            })
            .catch(error => {
                console.error(error); // Log any errors that occur during the request
                alert('Login failed. Please try again.'); // Notify the user if an error occurs
            });
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)} // Update username state
                className="input-field"
            />
            <select onChange={e => setUserRole(e.target.value)} value={userRole} className="input-field">
                <option value="learner">Learner</option>
                <option value="advisor">Advisor</option>
            </select>
            <input
                type="password"
                placeholder="Password"
                value={userPassword}
                onChange={e => setUserPassword(e.target.value)} // Update password state
                className="input-field"
            />
            <button onClick={handleLogin} className="submit-button">Login</button>
        </div>
    );
};

export default Login;
