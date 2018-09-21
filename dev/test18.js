const BlockChain = require('./blockchain');
const bitcoin = new BlockChain();

const previousBlockHash = "091329018291231903";
const currentBlockData = [{
    amount:10,
    sender:'idojsadioasdjas',
    reciever:'siaojdsdoiajdasd'
},
{
    amount:20,
    sender:'adsadasdasddasdsa',
    reciever:'dasdasddaasdasdasoi'
},
{
    amount:40,
    sender:'idasdojsadioasdjas',
    reciever:'asdasdojdsdoiajdasd'
}
];
const nonce = 321;
const result = bitcoin.hashBlock(previousBlockHash,currentBlockData,nonce);
console.log(result);