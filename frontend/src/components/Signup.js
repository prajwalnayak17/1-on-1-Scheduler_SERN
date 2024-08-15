import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
    const [username, setUsername] = useState(''); // State for storing the user's name
    const [organization, setOrganization] = useState(''); // State for storing the company name (for advisors)
    const [userRole, setUserRole] = useState('learner'); // State for storing the user's role
    const [userPassword, setUserPassword] = useState(''); // State for storing the user's password
    const navigate = useNavigate(); // Hook for navigation

    // Function to handle the signup process
    const handleSignup = () => {
        const signupDetails = { 
            name: username, 
            company_name: userRole === 'advisor' ? organization : null, 
            role: userRole, 
            password: userPassword 
        };

        // Send the signup request to the backend
        axios.post('http://localhost:5000/api/auth/signup', signupDetails)
            .then(() => {
                alert('Signup successful!'); // Notify the user of successful signup
                navigate('/login'); // Redirect to the login page
            })
            .catch(error => {
                console.error('Signup error:', error); // Log any errors during signup
                alert('There was an issue with signup. Please try again.'); // Notify the user of an error
            });
    };

    return (
        <div className="signup-container">
            <h1>Create an Account</h1>
            <input
                type="text"
                placeholder="Name"
                value={username}
                onChange={e => setUsername(e.target.value)} // Update name state
                className="input-field"
            />
            {userRole === 'advisor' && ( 
                <input
                    type="text"
                    placeholder="Company Name"
                    value={organization}
                    onChange={e => setOrganization(e.target.value)} 
                    className="input-field"
                />
            )}
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
            <button onClick={handleSignup} className="submit-button">Sign Up</button>
            <p>
                Already have an account? <Link to="/login">Log In</Link>
            </p>
        </div>
    );
};

export default Signup;
