const express = require('express');
const db = require('../config/db');
const router = express.Router();

// Create Contact
router.post('/createContact', (req, res) => {
    const { first_name, last_name, email, mobile_number, data_store } = req.body;

    if (data_store === 'DATABASE') {
        const sql = `INSERT INTO contacts (first_name, last_name, email, mobile_number) VALUES (?, ?, ?, ?)`;
        db.query(sql, [first_name, last_name, email, mobile_number], (err, result) => {
            if (err) throw err;
            res.json({ message: 'Contact created in DATABASE', contact_id: result.insertId });
        });
    } else {
        // CRM logic here
        res.status(400).json({ message: 'CRM not implemented yet' });
    }
});

// Retrieve Contact
router.post('/getContact', (req, res) => {
    const { contact_id, data_store } = req.body;

    if (data_store === 'DATABASE') {
        const sql = `SELECT * FROM contacts WHERE id = ?`;
        db.query(sql, [contact_id], (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                res.json(result[0]);
            } else {
                res.status(404).json({ message: 'Contact not found in DATABASE' });
            }
        });
    } else {
        // CRM logic here
        res.status(400).json({ message: 'CRM not implemented yet' });
    }
});

// Update Contact
router.post('/updateContact', (req, res) => {
    const { contact_id, new_email, new_mobile_number, data_store } = req.body;

    if (data_store === 'DATABASE') {
        const sql = `UPDATE contacts SET email = ?, mobile_number = ? WHERE id = ?`;
        db.query(sql, [new_email, new_mobile_number, contact_id], (err, result) => {
            if (err) throw err;
            res.json({ message: 'Contact updated in DATABASE' });
        });
    } else {
        // CRM logic here
        res.status(400).json({ message: 'CRM not implemented yet' });
    }
});

// Delete Contact
router.post('/deleteContact', (req, res) => {
    const { contact_id, data_store } = req.body;

    if (data_store === 'DATABASE') {
        const sql = `DELETE FROM contacts WHERE id = ?`;
        db.query(sql, [contact_id], (err, result) => {
            if (err) throw err;
            res.json({ message: 'Contact deleted from DATABASE' });
        });
    } else {
        // CRM logic here
        res.status(400).json({ message: 'CRM not implemented yet' });
    }
});

module.exports = router;
