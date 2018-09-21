const SHA256 = require('crypto-js/sha3');
const currentNodeUrl = process.argv[4];
function BlockChain(){
    this.chain = [];
    this.pendingTransactions = [];
    this.currentNodeUrl = currentNodeUrl;
    this.networkNodes = [];
    this.createNewBlock(0,'0','0');
}

//Doing it in class
//class BlockChainc{
//    constructor(){
//       this.chain = [];
//        this.nextTransactions = [];
//    }
//}

BlockChain.prototype.createNewBlock = function(nonce, previousBlockHash, hash){
const newBlock= {
    index:this.chain.length +1,
    timestamp:Date.now(),
    transactions:this.pendingTransactions,
    nonce:nonce,
    previousBlockHash:previousBlockHash,
    hash:hash
};
this.pendingTransactions = [];
this.chain.push(newBlock);
return newBlock;
};

BlockChain.prototype.fetchLastBlock = function(){
    return this.chain[this.chain.length-1];
};

BlockChain.prototype.createNewTransaction = function(amount, sender, reciever){
    const newTransaction = {
        amount: amount,
        sender: sender,
        reciever: reciever
    };
    this.pendingTransactions.push(newTransaction);
    return this.fetchLastBlock()['index'] + 1;
};

BlockChain.prototype.hashBlock = function(previousBlockHash, currentBlockData, nonce){
    const dataAsaString = previousBlockHash + JSON.stringify(currentBlockData)+ nonce.toString();
    const hash = SHA256(dataAsaString).toString();
    return hash;
    };

BlockChain.prototype.proofOfWork = function(previousBlockHash, currentBlockData){
let nonce = 0;
let hash = this.hashBlock(previousBlockHash, currentBlockData,nonce);
//running hash block metod until it doesn't give you the resulting hash with 0000
while (hash.substring(0,4) !== '0000'){
    nonce++;
    hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
}
//Returning nonce here
return nonce;
};
module.exports = BlockChain;
