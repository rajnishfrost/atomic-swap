const Web3 = require('web3');
const conf = require('./build/contracts/HashedTimelock.json');
const Contract_address = conf.networks['80001'].address;
const Contract_ABI = conf.abi;
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    'https://rpc-mumbai.maticvigil.com/'
  )
);
const contract = new web3.eth.Contract(Contract_ABI, Contract_address);
const address = '0xc54b40Db78B668d90E24Ca748FcF48966c5F36eB';
const pk = '386636c3c8469349353a167a1d9a89ebae99a20e375afc1099bf9b16ca8f0b9f';
async function newContract(){

    const nonce = await web3.eth.getTransactionCount(address);
    const gasprice = await web3.eth.getGasPrice();
    const orderhash2 = await contract.methods
      .newContract(
        '0x864C42Cce5180b7f48CeaA36672Ea698A8334248',
        '0x136e60187bf24defea230aaf47a6a0808c0ea67ce37d2e5f4f09f84b71a222cf',
        '1668664153'
      )
      .encodeABI();
    const tx= {
        from: address,
        to: Contract_address,
        gas: 1000000,                             // contract id 0xdf5f90e73986bf7e8d13e48e2670aab574a977e7b09804d301641a2531187381 string "rj"
        gasPrice:gasprice,                          // hash keccak256 0x136e60187bf24defea230aaf47a6a0808c0ea67ce37d2e5f4f09f84b71a222cf
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
  const orderhash2 = await contract.methods.getContract("0x1b57f06386a9231c29b0677d570757ac0d8dd6a64656b240087cd197932afe45").call({from : address , gas : 100000})
  console.log(orderhash2);
}
 const balance = async () => {
  const orderhash2 = await contract.methods.balance().call({from : address , gas : 100000})
  console.log(orderhash2);
  return orderhash2
}
async function refund(){

  const nonce = await web3.eth.getTransactionCount(address);
  const gasprice = await web3.eth.getGasPrice();
  const orderhash2 = await contract.methods.refund('0x17bcce3485d426e39c906b1a39c708a2406f6ce5769cc74c1ed35154abf64714').encodeABI();
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
async function getContract(){
  const orderhash2 = await contract.methods.getContract("0x17bcce3485d426e39c906b1a39c708a2406f6ce5769cc74c1ed35154abf64714").call({from : address , gas : 100000})
  console.log(orderhash2);
}

// newContract();
// getEvents();
// balance();
// refund();
// getContract();
module.exports={balance}







