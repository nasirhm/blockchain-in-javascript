const blockChain = require('./blockchain');
const bitcoin = new blockChain();

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
//console.log(bitcoin.proofOfWork(previousBlockHash,currentBlockData));
//This is how proof of work works its easy to find the nonce and its too easy too validate it as we know the nonce
console.log(bitcoin.hashBlock(previousBlockHash,currentBlockData,103514));
console.log(bitcoin.fetchLastBlock);