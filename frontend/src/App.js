// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Scheduler from './components/Scheduler';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Signup />} /> {}
                    <Route path="/login" element={<Login />} />
                    <Route path="/scheduler" element={<Scheduler />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;