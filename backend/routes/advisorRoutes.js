// backend/routes/advisorRoutes.js
const express = require('express');
const db = require('../config/db');
const router = express.Router();

router.get('/', (req, res) => {
    db.all('SELECT * FROM advisors', [], (err, rows) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json(rows);
    });
});

router.post('/', (req, res) => {
    const { advisorName, area_of_interest, available_time } = req.body;
    db.run('INSERT INTO advisors (advisorName, area_of_interest, available_time) VALUES (?, ?, ?)', [advisorName, area_of_interest, available_time], function(err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json({ advisorId: this.lastID, advisorName, area_of_interest, available_time });
    });
});

module.exports = router;
