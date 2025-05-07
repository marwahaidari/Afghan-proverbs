const express = require('express');
const app = express();
const proverbsRoutes = require('./route/proverbs');

app.use(express.json());
app.use('/proverbs', proverbsRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server is runing on http://localhost:${PORT}`)
}) 