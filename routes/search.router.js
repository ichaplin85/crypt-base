const express = require('express');
require('dotenv').config();

const router = express.Router();

router.get('/:search', async (req, res) => {
    console.log(req.query);
    const {search} = req.query;
    console.log(search);
    res.end();
})

module.exports = router;
