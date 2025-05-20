const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/proverbs.json');

// GET all proverbs, optionally filter by category
function getAllProverbs(req, res) {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ message: 'Error reading data.' });

        let proverbs = JSON.parse(data);
        const category = req.query.category;

        if (category) {
            proverbs = proverbs.filter(p => p.category?.toLowerCase() === category.toLowerCase());
        }

        res.json(proverbs);
    });

}

// GET single proverb by ID
function getProverbById(req, res) {
    const id = parseInt(req.params.id);

    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ message: 'Error reading data.' });

        const proverbs = JSON.parse(data);
        const proverb = proverbs.find(p => p.id === id);

        if (!proverb) return res.status(404).json({ message: 'Proverb not found.' });

        res.json(proverb);
    });
}

// POST a new proverb
function addProverb(req, res) {
    const newProverb = req.body;

    if (!newProverb || !newProverb.textDari || !newProverb.textPashto || !newProverb.translationEn || !newProverb.meaning || !newProverb.category) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ message: 'Error reading data.' });

        const proverbs = JSON.parse(data);
        const newId = proverbs.length ? proverbs[proverbs.length - 1].id + 1 : 1;
        const proverbToAdd = { id: newId, ...newProverb };

        proverbs.push(proverbToAdd);

        fs.writeFile(dataPath, JSON.stringify(proverbs, null, 2), err => {
            if (err) return res.status(500).json({ message: 'Error saving data.' });

            res.status(201).json(proverbToAdd);
        });
    });
}

// PUT update an existing proverb
function updateProverb(req, res) {
    const id = parseInt(req.params.id);
    const updatedData = req.body;

    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ message: 'Error reading data.' });

        const proverbs = JSON.parse(data);
        const index = proverbs.findIndex(p => p.id === id);

        if (index === -1) return res.status(404).json({ message: 'Proverb not found.' });

        proverbs[index] = { ...proverbs[index], ...updatedData };

        fs.writeFile(dataPath, JSON.stringify(proverbs, null, 2), err => {
            if (err) return res.status(500).json({ message: 'Error saving data.' });

            res.json(proverbs[index]);
        });
    });
}

// DELETE a proverb by ID
function deleteProverb(req, res) {
    const id = parseInt(req.params.id);

    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ message: 'Error reading data.' });

        let proverbs = JSON.parse(data);
        const index = proverbs.findIndex(p => p.id === id);

        if (index === -1) return res.status(404).json({ message: 'Proverb not found.' });

        const deleted = proverbs.splice(index, 1)[0];

        fs.writeFile(dataPath, JSON.stringify(proverbs, null, 2), err => {
            if (err) return res.status(500).json({ message: 'Error saving data.' });

            res.json({ message: 'Proverb deleted successfully.', deleted });
        });
    });
} function getRandomProverb(req, res) {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) return
        res.status(500).json({ message: "Error reading data." });

        const proverbs = JSON.parse(data);
        const randomIndex = Math.floor(Math.random() * proverbs.length);
        res.json(proverbs[randomIndex])
    })
}



module.exports = {
    getAllProverbs,
    getProverbById,
    addProverb,
    updateProverb,
    deleteProverb,
    getRandomProverb
};