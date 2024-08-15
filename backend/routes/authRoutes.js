// backend/routes/authRoutes.js
const express = require('express');
const db = require('../config/db');
const router = express.Router();

// Signup route
router.post('/signup', (req, res) => {
    const { name, company_name, role, password } = req.body;

    // Determine the SQL query and parameters based on the role
    let sql;
    let params;

    if (role === 'advisor') {
        sql = `INSERT INTO advisors (advisorName, company_name, password) VALUES (?, ?, ?)`;
        params = [name, company_name, password];
    } else {
        sql = `INSERT INTO learners (learnerName, password) VALUES (?, ?)`;
        params = [name, password];
    }

    // Log the SQL query and parameters for debugging
    console.log('SQL Query:', sql);
    console.log('Parameters:', params);

    db.run(sql, params, function(err) {
        if (err) {
            console.error('Signup error:', err.message); // Log the error message
            return res.status(500).send('Error during signup. Please try again.'); // Send a generic error message
        }
        res.json({ id: this.lastID, name, company_name });
    });
});

// Login route
router.post('/login', (req, res) => {
    const { name, role, password } = req.body;
    const table = role === 'advisor' ? 'advisors' : 'learners';

    db.get(`SELECT * FROM ${table} WHERE ${role === 'advisor' ? 'advisorName' : 'learnerName'} = ? AND password = ?`, [name, password], (err, row) => {
        if (err) {
            console.error('Login error:', err.message); // Log the error message
            return res.status(500).send(err.message);
        }
        if (row) {
            res.json(row);
        } else {
            res.status(404).send('User not found or incorrect password');
        }
    });
});

module.exports = router;
