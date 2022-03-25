const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.sendStatus(500);
        res.clearCookie('cookieName');
        return res.redirect('/');
    });
});

module.exports = router;
