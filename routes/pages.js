const express = require('express');
const axios = require('axios');
const router = express.Router();

// آدرس API بک‌اند
const baseURL = 'http://localhost:3001/api/proverbs';

// صفحه اصلی - نمایش تمام ضرب‌المثل‌ها

// Show styled EJS view of all proverbs


router.get('/', async (req, res) => {
    try {
        const response = await axios.get(baseURL);
        res.render('index', { proverbs: response.data });
    } catch (error) {
        console.error('❌ Error loading proverbs:', error.message);
        if (!res.headersSent) {
            res.status(500).send('Error loading page');
        }
    }
});


// نمایش یک ضرب‌المثل خاص
router.get('/proverb/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const response = await axios.get(`${baseURL}/${id}`);
        res.render('show', { proverb: response.data });
    } catch (error) {
        console.error('❌ Error fetching single proverb:', error.message);
        res.status(500).send("Error fetching proverb");
    }
});

// فرم افزودن ضرب‌المثل جدید
router.get('/add', (req, res) => {
    res.render('add');
});

// فرم ویرایش ضرب‌المثل
router.get('/edit/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const response = await axios.get(`${baseURL}/${id}`);
        res.render('edit', { proverb: response.data });
        console.log(response.data)
    } catch (error) {
        console.error('❌ Error loading edit form:', error.message);
        res.status(500).send("Error loading edit form");
    }
});

// ثبت ویرایش ضرب‌المثل (در صورت استفاده از فرم HTML و method="POST")
router.post('/edit/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await axios.put(`${baseURL}/${id}`, req.body);
        res.redirect('/');
    } catch (error) {
        console.error('❌ Error updating proverb:', error.message);
        res.status(500).send("Error updating proverb");
    }
});

// حذف ضرب‌المثل
router.post('/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await axios.delete(`${baseURL}/${id}`);
        res.redirect('/');
    } catch (error) {
        console.error('❌ Error deleting proverb:', error.message);
        res.status(500).send('Error deleting proverb');
    }
});

// نمایش یک ضرب‌المثل تصادفی
router.get('/random', async (req, res) => {
    try {
        const response = await axios.get(`${baseURL}/random`);
        res.render('random', { proverb: response.data });
    } catch (error) {
        console.error('❌ Error fetching random proverb:', error.message);
        res.status(500).send('Error fetching random proverb');
    }
});

module.exports = router;
