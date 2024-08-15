// backend/routes/learnerRoutes.js
const express = require('express');
const db = require('../config/db');
const router = express.Router();

router.post('/', (req, res) => {
    const { learnerName, interestArea } = req.body;
    db.run('INSERT INTO learners (learnerName, interestArea) VALUES (?, ?)', [learnerName, interestArea], function(err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json({ learnerId: this.lastID, learnerName, interestArea });
    });
});

module.exports = router;
