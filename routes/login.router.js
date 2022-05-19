const express = require('express');

const router = express.Router();
const { Lot, User, Rates } = require('../db/models');
const sha256 = require('sha256');

router.get('/', (req, res) => {

    res.render('login');
});

router.post('/', async (req,res)=> {
    const { email } = req.body;
    const password = sha256(req.body.password);
    let checkUser;
    try {
        checkUser = await User.findOne({
            where: {
                email,
                password,
            },
        });
    } catch (err) {
        console.log('errrerer check user', err);
    }
    if (checkUser) {
        req.session.userId = checkUser.id;
        req.session.userEmail = checkUser.email;
        req.session.userName = checkUser.name;
        res.redirect('/');
    } else {
        res.sendStatus(401);
    }
});
module.exports = router;
