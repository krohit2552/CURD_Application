const axios = require('axios');

const freshsalesApiKey = process.env.FRESHSALES_API_KEY;
const freshsalesDomain = process.env.FRESHSALES_DOMAIN;

const freshsalesInstance = axios.create({
    baseURL: `https://${freshsalesDomain}/api/`,
    headers: {
        'Authorization': `Token token=${freshsalesApiKey}`,
        'Content-Type': 'application/json'
    }
});

// Create Contact
exports.createContact = async (req, res) => {
    try {
        const { first_name, last_name, email, mobile_number } = req.body;
        const response = await freshsalesInstance.post('contacts', {
            contact: { first_name, last_name, email, mobile_number }
        });
        res.status(201).json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error creating contact', error: error.message });
    }
};

// Retrieve Contact
exports.getContact = async (req, res) => {
    try {
        const { contact_id } = req.body;
        const response = await freshsalesInstance.get(`contacts/${contact_id}`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving contact', error: error.message });
    }
};

// Update Contact
exports.updateContact = async (req, res) => {
    try {
        const { contact_id, new_email, new_mobile_number } = req.body;
        const response = await freshsalesInstance.put(`contacts/${contact_id}`, {
            contact: { email: new_email, mobile_number: new_mobile_number }
        });
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error updating contact', error: error.message });
    }
};

// Delete Contact
exports.deleteContact = async (req, res) => {
    try {
        const { contact_id } = req.body;
        await freshsalesInstance.delete(`contacts/${contact_id}`);
        res.status(204).json({ message: 'Contact deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting contact', error: error.message });
    }
};
