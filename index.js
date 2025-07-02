const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const quotes = require('./quotes.json');

const app = express();
const PORT = 3000;

// Swagger doc
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Endpoint
app.get('/api/quote', (req, res) => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    res.json(quotes[randomIndex]);
});

// Id
app.get('/api/quote/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const quote = quotes.find(q => q.id === id);
    if (quote) {
        res.json(quote);
    } else {
        res.status(404).json({ error: 'Frase no encontrada'})
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}/api-docs`);
});