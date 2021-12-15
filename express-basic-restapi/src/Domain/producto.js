// Endpoints for external data
const { Router } = require('express');
const router = new Router();

const fetch = require('node-fetch');

router.get('/', async (req, res) => {
    const response = await fetch('http://127.0.0.1:4000/products');
    const data = await response.json();
    res.json(data);
});

module.exports = router;