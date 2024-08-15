// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const advisorRoutes = require('./routes/advisorRoutes');
const learnerRoutes = require('./routes/learnerRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Create tables if they don't exist or modify them if needed
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS advisors (
        advisorId INTEGER PRIMARY KEY AUTOINCREMENT,
        advisorName TEXT NOT NULL,
        company_name TEXT,
        password TEXT NOT NULL,
        area_of_interest TEXT,
        available_time TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS learners (
        learnerId INTEGER PRIMARY KEY AUTOINCREMENT,
        learnerName TEXT NOT NULL,
        password TEXT,
        interestArea TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS appointments (
        appointmentId INTEGER PRIMARY KEY AUTOINCREMENT,
        learnerId INTEGER,
        advisorId INTEGER,
        meetingDuration INTEGER,
        scheduledTime TEXT,
        FOREIGN KEY (learnerId) REFERENCES learners(learnerId),
        FOREIGN KEY (advisorId) REFERENCES advisors(advisorId)
    )`);
});

app.use('/api/auth', authRoutes);
app.use('/api/advisors', advisorRoutes);
app.use('/api/learners', learnerRoutes);
app.use('/api/appointments', appointmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
