const express = require('express');
const { createContact, getContact, updateContact, deleteContact } = require('../controllers/contactController1');

const router1 = express.Router();

router1.post('/createContact1', createContact);
router1.post('/getContact1', getContact);
router1.post('/updateContact1', updateContact);
router1.post('/deleteContact1', deleteContact);

module.exports = router1;
