const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const dataPath = path.join(__dirname, '../data/proverbs.json');

// GET /proverbs - return all proverbs
router.get('/', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            console.error('❌ Failed to read proverbs.json:', err.message);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        try {
            const proverbs = JSON.parse(data);
            res.json(proverbs);
        } catch (parseErr) {
            console.error('❌ JSON parse error:', parseErr.message);
            res.status(500).json({ error: 'Invalid JSON format' });
        }
    });
});

module.exports = router;
