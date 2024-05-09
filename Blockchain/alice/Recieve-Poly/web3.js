const Web3 = require('web3');
const conf = require('../../BOB/send_poly/build/contracts/HashedTimelock.json');
const Contract_address = conf.networks['80002'].address;
const Contract_ABI = conf.abi;
const web3 = new Web3(new Web3.providers.HttpProvider("https://rpc-amoy.polygon.technology/"));
const contract = new web3.eth.Contract(Contract_ABI, Contract_address);
const address = "0x659c55Af1C9035F14C10f5b3765D8469dECB09a8";
const pk = "658d9dba16bb028dc6b79b8cc2fcda09ad95a33e00622fa1dfbea17227e7c129";

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
  const orderhash2 = await contract.methods.withdraw("0x692a43840066e526d1ee1eb41912866bfea478fca146e4fde8f865b0432a99f5",'rj').encodeABI();
  const tx = {
    from: address,
    to: Contract_address,
    gas: 150000,
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
// withdrawal();





