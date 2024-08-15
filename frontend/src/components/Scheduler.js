import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Scheduler = () => {
    const [advisorList, setAdvisorList] = useState([]); // State for storing the list of advisors
    const [learnerName, setLearnerName] = useState(''); // State for storing the learner's name
    const [interestArea, setInterestArea] = useState(''); // State for storing the learner's area of interest
    const [sessionDuration, setSessionDuration] = useState(30); // State for storing the duration of the session
    const [sessionDateTime, setSessionDateTime] = useState(''); // State for storing the session time
    const [chosenAdvisor, setChosenAdvisor] = useState(''); // State for storing the selected advisor

    // Function to fetch the list of available advisors
    const loadAdvisors = () => {
        axios.get('http://localhost:5000/api/advisors')
            .then(response => setAdvisorList(response.data)) // Update the advisor list state with the fetched data
            .catch(error => console.error('Failed to retrieve advisors:', error)); // Log errors if any occur
    };

    useEffect(() => {
        loadAdvisors(); // Fetch advisors when the component mounts
    }, []);

    // Function to handle session scheduling
    const handleScheduleSession = () => {
        // Ensure all required fields are filled
        if (!learnerName || !interestArea || !chosenAdvisor || !sessionDateTime) {
            alert('All fields are required. Please fill in all the details.');
            return;
        }

        const learnerDetails = { name: learnerName, interestArea }; // Prepare the learner data

        // Send learner data to the backend and then schedule the session
        axios.post('http://localhost:5000/api/learners', learnerDetails)
            .then(response => {
                const appointmentDetails = {
                    learnerId: response.data.learnerId,
                    advisorId: chosenAdvisor,
                    meetingDuration: sessionDuration,
                    scheduledTime: sessionDateTime
                };

                return axios.post('http://localhost:5000/api/appointments', appointmentDetails); // Schedule the session
            })
            .then(() => {
                alert('Session successfully scheduled!'); // Notify on successful scheduling

                // Reset form fields after scheduling
                setLearnerName('');
                setInterestArea('');
                setSessionDuration(30);
                setSessionDateTime('');
                setChosenAdvisor('');
                loadAdvisors(); // Refresh the advisor list
            })
            .catch(err => {
                console.error('Failed to schedule the session:', err); // Log any scheduling errors
                alert('Error scheduling the session. Please verify your input and try again.');
            });
    };

    return (
        <div>
            <h1>Book a Session</h1>
            <input
                type="text"
                placeholder="Learner Name"
                value={learnerName}
                onChange={e => setLearnerName(e.target.value)} // Update learner name state
            />
            <select onChange={e => setInterestArea(e.target.value)} value={interestArea}>
                <option value="">Select Area of Interest</option>
                <option value="Product Management">Product Management</option>
                <option value="Software Engineering">Software Engineering</option>
                <option value="Data Analytics">Data Analytics</option>
                <option value="Software Testing">Software Testing</option>
            </select>
            <select onChange={e => setChosenAdvisor(e.target.value)} value={chosenAdvisor}>
                <option value="">Select an Advisor</option>
                {advisorList.map(advisor => (
                    <option key={advisor.advisorId} value={advisor.advisorId}>
                        {advisor.advisorName} - {advisor.area_of_interest}
                    </option>
                ))}
            </select>
            <select onChange={e => setSessionDuration(e.target.value)} value={sessionDuration}>
                <option value="30">30 mins</option>
                <option value="45">45 mins</option>
                <option value="60">60 mins</option>
            </select>
            <input
                type="datetime-local"
                value={sessionDateTime}
                onChange={e => setSessionDateTime(e.target.value)} // Update session time state
            />
            <button onClick={handleScheduleSession}>Schedule Session</button>
        </div>
    );
};

export default Scheduler;
