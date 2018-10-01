var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var blockChain = require('./blockchain');
var bitcoin = new blockChain();
var uuid = require('uuid/v1');
var nodePort = process.argv[2];
var rp = require('request-promise');
const nodeAddress = uuid().split('-').join('');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.get('/blockchain', function (req, res) {
    res.send(bitcoin);
});

app.post('/transactions', function (req, res) {
    const blockIndex = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.reciever);
    res.json({
        note: `The Block has been added to ${blockIndex}.`
    });
});

app.get('/mine', function (req, res) {
    const lastBlock = bitcoin.fetchLastBlock();
    const previousBlockhash = lastBlock['hash'];
    const curentBlockdata = {
        transactions: bitcoin.pendingTransactions,
        index: lastBlock['index'] + 1
    };
    const nonce = bitcoin.proofOfWork(previousBlockhash, curentBlockdata);
    const blockHash = bitcoin.hashBlock(previousBlockhash, curentBlockdata, nonce);
    bitcoin.createNewTransaction(12.5, "00", nodeAddress);
    const newBlock = bitcoin.createNewBlock(nonce, previousBlockhash, blockHash);
    res.json({
        note: 'New Block Mined Successfully',
        block: newBlock,

    });
    //Register and Bradcast the Node to the Network
    app.post('/register-and-broadcast-node', function (req, res) {
        const newNodeUrl = req.body.newNodeUrl;
        if (bitcoin.networkNodes.indexOf(newNodeUrl) == -1) bitcoin.networkNodes.push(newNodeUrl);
        const regNodesPromises = [];
        bitcoin.networkNodes.forEach(networknodeURL => {
            const requestOptions = {
                uri: networknodeURL + '/register-node',
                method: 'POST',
                body: {
                    newNodeUrl: newNodeUrl
                },
                json: true
            };
            regNodesPromises.push(rp(requestOptions));
        });
        Promise.all(regNodesPromises)
            .then(data => {
                const bulkRegisterOptions = {
                    uri: newNodeUrl + '/register-nodes-bulk',
                    method: 'POST',
                    body: {
                        allNetworkNodes: [...bitcoin.networkNodes, bitcoin.currentNodeUrl]
                    },
                    json: true
                };
                return rp(bulkRegisterOptions);
            })
            .then(data => {
                 res.json({
                     note: "New node registered in Network Successfully"
                 });
            }
            );
    });
    //Just Register the Node to their BlockChain
    app.post('/register-node', function (req, res) {
        const newNodeUrl = req.body.newNodeUrl;
        

    });
    //Register Multiple Nodes at Once
    app.post('/reigster-nodes-bulk', function (req, res) {


    });

});

app.listen(nodePort, function () {
    console.log(`Serving on Port ${nodePort}....`);
});