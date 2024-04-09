const Web3 = require('web3');
const conf = require('./build/contracts/HashedTimelock.json');
const Contract_address = conf.networks['80001'].address;
const Contract_ABI = conf.abi;
const web3 = new Web3(new Web3.providers.HttpProvider("https://polygon-mumbai.g.alchemy.com/v2/T--bLJdkZ9zbQXmPjYUpwSTVC9V75jGz"));
const contract = new web3.eth.Contract(Contract_ABI, Contract_address);
const address = "0x864C42Cce5180b7f48CeaA36672Ea698A8334248";
const pk = "748d8ac83d9023e2d46f5b4acde8988c3b1bd6a4269172284e9ad326171bbb2d";

async function getEvents(){
let a = await contract.getPastEvents('LogHTLCNew',{fromBlock:0,toBlock:'latest',filter:{from:address}})
console.log(a);
}

async function getContract(){
  const orderhash2 = await contract.methods.getContract("0x1b57f06386a9231c29b0677d570757ac0d8dd6a64656b240087cd197932afe45").call({from : address , gas : 100000})
  console.log(orderhash2);
}

async function withdrawal() {
  const nonce = await web3.eth.getTransactionCount(address);
  const gasprice = await web3.eth.getGasPrice();
  const orderhash2 = await contract.methods.withdraw("0x17bcce3485d426e39c906b1a39c708a2406f6ce5769cc74c1ed35154abf64714",'rj').encodeABI();
  const tx = {
    from: address,
    to: Contract_address,
    gas: 1000000,
    gasPrice: gasprice,
    data: orderhash2,
    nonce,
  };

  const signature = await web3.eth.accounts.signTransaction(tx,pk);
  const recepit = await web3.eth.sendSignedTransaction(signature.rawTransaction);
  console.log("Signed Transaction ",recepit );
}


// getEvents();
// getContract();
withdrawal();





