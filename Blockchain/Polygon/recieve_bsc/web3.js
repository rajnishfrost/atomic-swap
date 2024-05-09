const Web3 = require('web3');
const conf = require('../../alice/Send-Binance/build/contracts/HashedTimelock.json');
const Contract_address = conf.networks['97'].address;
const Contract_ABI = conf.abi;
const web3 = new Web3(new Web3.providers.HttpProvider("https://data-seed-prebsc-2-s1.binance.org:8545/"));
const contract = new web3.eth.Contract(Contract_ABI, Contract_address);
const address = '0xc54b40Db78B668d90E24Ca748FcF48966c5F36eB';
const pk = '386636c3c8469349353a167a1d9a89ebae99a20e375afc1099bf9b16ca8f0b9f';

async function getEvents(){
let a = await contract.getPastEvents('LogHTLCNew',{fromBlock:0,toBlock:'latest',filter:{from:address}})
console.log(a);
}

async function getContract(){
  const orderhash2 = await contract.methods.getContract("0xe15c713817896bc44bd24beeb0e26bef1cb7c6e0174fa8196fbb87ec0e75366a").call({from : address , gas : 100000})
  console.log(orderhash2);
}

async function withdrawal() {
  const nonce = await web3.eth.getTransactionCount(address);
  const gasprice = await web3.eth.getGasPrice();
  const orderhash2 = await contract.methods.withdraw('0xC1968583F04126CDFE6E0A92D36FDBA72F9711289E9A12CF54591EBEAAA416EF','rj').encodeABI();
  console.log(orderhash2);
  const tx = {
    from:address,
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
// console.log(Contract_address);




