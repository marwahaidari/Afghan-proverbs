const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const proverbsRoutes = require('./routes/proverbs');
const pageRoutes = require('./routes/pages');

// توجه: حتما مسیر صفحه ها (render) را قبل از api بگذارید
app.use('/', pageRoutes);
app.use('/api/proverbs', proverbsRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
