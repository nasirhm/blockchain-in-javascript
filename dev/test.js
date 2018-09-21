const Blockchain = require('./blockchain');
const bitcoin = new Blockchain();
// 1 Test Start
//bitcoin.createNewBlock(544,'0x132456789','0x212346780');
//bitcoin.createNewBlock(545,'0x123456789','0x012546750');
//bitcoin.createNewBlock(549,'0x154456789','0x315446790');
// 1 Test End

// 2 Test Start
bitcoin.createNewBlock(123,'SUIADHAUSIDASI','UIDSFASDIOUOAFH'); //Creates new Block
bitcoin.createNewTransaction(100,'JILLAIISOUADH','NASIROIADSJID'); //creates new transaction and adds it to pending transactions array
bitcoin.createNewBlock(1243,'IUSAODUDIAISOD','ASDISAOJDSAIOJ'); //Creating a Block and it adds the elements in the pending transaction to the new block

bitcoin.createNewTransaction(100,'JILLAIISOUADH','NASIROIADSJID'); //creates new transaction and adds it to pending transactions array
bitcoin.createNewTransaction(100,'JILLAIISOUADH','NASIROIADSJID'); //creates new transaction and adds it to pending transactions array
bitcoin.createNewTransaction(100,'JILLAIISOUADH','NASIROIADSJID'); //creates new transaction and adds it to pending transactions array

console.log(bitcoin.chain); 