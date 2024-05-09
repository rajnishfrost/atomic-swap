const Web3 = require('../../../alice/Send-Binance/node_modules/web3/types');
const conf = require('./build/contracts/HashedTimelock.json');
const Contract_address = conf.networks['97'].address;
const Contract_ABI = conf.abi;
const web3 = new Web3(new Web3.providers.HttpProvider("https://data-seed-prebsc-2-s1.binance.org:8545/"));
const contract = new web3.eth.Contract(Contract_ABI, Contract_address);
const address = "0x659c55Af1C9035F14C10f5b3765D8469dECB09a8";
const pk = "658d9dba16bb028dc6b79b8cc2fcda09ad95a33e00622fa1dfbea17227e7c129";

async function newContract(){
    let a = web3.utils.keccak256("rj");
    const nonce = await web3.eth.getTransactionCount(address);
    const gasprice = await web3.eth.getGasPrice();
    const orderhash2 = await contract.methods.newContract("0xc54b40Db78B668d90E24Ca748FcF48966c5F36eB" , a , "1710326586").encodeABI();
    const tx= {
        from: address,
        to: Contract_address,
        gas: 1000000,                             
        gasPrice:gasprice,                          
        data:orderhash2,
        nonce,
        value : web3.utils.toWei('0.1', 'ether')
      }


      const signature = await web3.eth.accounts.signTransaction(tx,pk);
      const recepit = await web3.eth.sendSignedTransaction(signature.rawTransaction);
      console.log(recepit);
}

async function getEvents(){
  let a = await contract.getPastEvents('LogHTLCNew', {
    fromBlock: 29163139,
    toBlock: '29163139',
    filter: { from: address },
  });
  console.log(a);
  }

async function getContract(){
  const orderhash2 = await contract.methods.getContract("0xC1968583F04126CDFE6E0A92D36FDBA72F9711289E9A12CF54591EBEAAA416EF").call({from : address , gas : 100000})
  console.log(orderhash2);
}

async function gettimestamp(){
const time = await contract.methods.getCurrentTimestamp().call({from : address , gas : 100000});
console.log(time);
}

async function refund(){

  const nonce = await web3.eth.getTransactionCount(address);
  const gasprice = await web3.eth.getGasPrice();
  const orderhash2 = await contract.methods.refund('0xE15C713817896BC44BD24BEEB0E26BEF1CB7C6E0174FA8196FBB87EC0E75366A').encodeABI();
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

async function balance(){
  const orderhash2 = await contract.methods.balance().call({from : address , gas : 100000})
  console.log(orderhash2);
}

// newContract();
// refund();
getEvents();
// getContract();
// gettimestamp();
// balance();





