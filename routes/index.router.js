const express = require('express');
require('dotenv').config();
const axios = require('axios');

const router = express.Router();

const Client = require('coinbase').Client;
const client = new Client({
    'apiKey': process.env.NODE_API_KEY,
    'apiSecret': process.env.NODE_API_SECRET,
    strictSSL: false
});

router.get("/test", (req,res)=>
{
    res.send("lkajsdhfaklsjdhf")
})

router.get('/', async (req, res) => {

    const {search} = req.query;
    let accountBalance = await axios.get(`https://api.nanopool.org/v1/eth/balance/${search}`)
    accountBalance = accountBalance.data;
    let averageMiner = await axios.get(`https://api.nanopool.org/v1/eth/avghashratelimited/${search}/24`)
    averageMiner = averageMiner.data;
    const listWorkers = await axios.get(`https://api.nanopool.org/v1/eth/workers/${search}`);
    const getListWorkers = listWorkers.data.data;
    const nanoPoolData = {averageMiner, accountBalance}

    const getExchangeRates = (params) => {
        return new Promise((res, rej) => {
            client.getExchangeRates(params,  function (err, rates) {
                if (err) rej(err)
                res(rates);
            })
        })
    }
    let btcData = await getExchangeRates({'currency': 'BTC'});
    btcData = btcData.data.rates;

    // console.log('listworkersdata',getListWorkers)
    // console.log('nanoPoolData>>>>>>>>>>>>>>>>>>>>>',nanoPoolData)
    if (res.locals.userId && search) {
       return res.render('index', { btcData, nanoPoolData, getListWorkers });
    }
    if (res.locals.userId) {
        return res.render('index', { btcData});
    }
    else {
       return res.render('index')
    }

});

module.exports = router;
