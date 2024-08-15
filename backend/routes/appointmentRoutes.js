
// module.exports = router// backend/routes/appointmentRoutes.js
const express = require('express');
const db = require('../config/db');
const router = express.Router();

router.post('/', (req, res) => {
    const { learnerId, advisorId, meetingDuration, scheduledTime } = req.body;

    if (!learnerId || !advisorId || !meetingDuration || !scheduledTime) {
        return res.status(400).send('Missing required fields');
    }

    db.run('INSERT INTO appointments (learnerId, advisorId, meetingDuration, scheduledTime) VALUES (?, ?, ?, ?)', [learnerId, advisorId, meetingDuration, scheduledTime], function(err) {
        if (err) {
            console.error('Error inserting appointment:', err.message);
            return res.status(500).send(err.message);
        }
        res.json({ appointmentId: this.lastID });
    });
});

module.exports = router;
