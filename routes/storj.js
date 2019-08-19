let express = require('express');
let router = express.Router();
let {
    getBlockNumber,
    getBalance,
    totalSupply,
    transfer,
    getTransaction,
    mint
} = require("../integrations/storj");

router.get('/blocknumber', async function (req, res, next) {
    console.log("Inside /blockNumber");
    let blockNumber;
    try {
        blockNumber = await getBlockNumber();
    } catch (err) {
        console.log(err);
        res.send({error: err})
    }
    res.send({blockNumber: blockNumber})
});

router.post('/transfer', async (req, res, next) => {

    console.log("Request Body : " + req.body);

    let toAddress = req.body.toAddress;
    let amount = req.body.amount;

    let transactionId;
    let transferErr;

    try {
        transactionId = await transfer(toAddress, amount);
    } catch (err) {
        transferErr = err;
        console.log(err);
        res.send({transactionId: transferErr.message});
    }

    console.log("Transaction Id : " + transactionId);

    res.send({transactionId: transactionId});
});

router.post('/mint', async (req, res, next) => {

    console.log("Request Body : " + req.body);

    let toAddress = req.body.toAddress;
    let amount = req.body.amount;

    let transactionId;
    let transferErr;

    try {
        transactionId = await mint(toAddress, amount);
    } catch (err) {
        transferErr = err;
        console.log(err);
        res.send({transactionId: transferErr.message});
    }

    console.log("Transaction Id : " + transactionId);

    res.send({transactionId: transactionId});
});



router.get('/:userAddress/balance', async function (req, res, next) {

    console.log("Inside /balance");
    let userAddress = req.params.userAddress;

    console.log(userAddress);

    let balance;
    try {
        balance = await getBalance(userAddress);
    } catch (err) {
        console.log(err);
        res.send({error: err})
    }
    res.send({balance: balance})
});

router.get('/totalSupply', async function (req, res, next) {

    let totalSupplyNum;
    try {
        totalSupplyNum = await totalSupply();
    } catch (err) {
        console.log(err);
        res.send({error: err})
    }
    res.send({tokensSupply: totalSupplyNum})
});

router.get('/transaction/:hash', async function (req, res, next) {
    res.send({transaction: await getTransaction(req.params.hash) });
});

module.exports = router;
