const Web3 = require('web3');
let contract;
let web3;
let Contract_address;

async function newContract(from, to, pass, time, pk, rpc, chainID, coins) {
  if (chainID === '80002') {
    const conf = require('./build/contracts/HashedTimelock.json');
    Contract_address = conf.networks['80002'].address;
    const Contract_ABI = conf.abi;
    web3 = new Web3(new Web3.providers.HttpProvider('https://rpc-amoy.polygon.technology/'));
    contract = new web3.eth.Contract(Contract_ABI, Contract_address);
  }
  else if (chainID === '97') {
    const conf = require('../Binance/build/contracts/HashedTimelock.json');
    Contract_address = conf.networks['97'].address;
    const Contract_ABI = conf.abi;
    web3 = new Web3(new Web3.providers.HttpProvider("https://data-seed-prebsc-2-s1.binance.org:8545/"));
    contract = new web3.eth.Contract(Contract_ABI, Contract_address);
  }
  let secret = web3.utils.keccak256(pass);
  const nonce = await web3.eth.getTransactionCount(from);
  const gasprice = await web3.eth.getGasPrice();
  const data = await contract.methods.newContract(to, secret, time).encodeABI();;
  const tx = {
    from,
    to: Contract_address,
    gas: 1000000,
    gasPrice: gasprice,
    data,
    nonce,
    value: web3.utils.toWei(coins, 'ether')
  }
  const signature = await web3.eth.accounts.signTransaction(tx, pk);
  const receipt = await web3.eth.sendSignedTransaction(signature.rawTransaction);
  console.log(receipt);
  return receipt
}

async function getEvents(chainID) {
  if (chainID === '80002') {
    const conf = require('./build/contracts/HashedTimelock.json');
    Contract_address = conf.networks['80002'].address;
    const Contract_ABI = conf.abi;
    web3 = new Web3(new Web3.providers.HttpProvider('https://rpc-amoy.polygon.technology/'));
    contract = new web3.eth.Contract(Contract_ABI, Contract_address);
  }
  else if (chainID === '97') {
    const conf = require('../Binance/build/contracts/HashedTimelock.json');
    Contract_address = conf.networks['97'].address;
    const Contract_ABI = conf.abi;
    web3 = new Web3(new Web3.providers.HttpProvider("https://bsc-testnet.blockpi.network/v1/rpc/public"));
    contract = new web3.eth.Contract(Contract_ABI, Contract_address);
  }
  let latestBlock = await web3.eth.getBlockNumber();
  const events = await contract.getPastEvents('LogHTLCNew', {
    fromBlock: latestBlock,
    toBlock: 'latest',
  });
  if (events.length > 0) {
    return events[events.length - 1];
  } else {
    return { msg: "no log found" };
  }
}

const balance = async () => {
  const orderhash2 = await contract.methods.balance().call({ from: address, gas: 100000 })
  console.log(orderhash2);
  return orderhash2
}

async function refund(contract_id, from, pk, chainID) {
  if (chainID === '80002') {
    const conf = require('./build/contracts/HashedTimelock.json');
    Contract_address = conf.networks['80002'].address;
    const Contract_ABI = conf.abi;
    web3 = new Web3(new Web3.providers.HttpProvider('https://rpc-amoy.polygon.technology/'));
    contract = new web3.eth.Contract(Contract_ABI, Contract_address);
  }
  else if (chainID === '97') {
    const conf = require('../Binance/build/contracts/HashedTimelock.json');
    Contract_address = conf.networks['97'].address;
    const Contract_ABI = conf.abi;
    web3 = new Web3(new Web3.providers.HttpProvider("https://data-seed-prebsc-2-s1.binance.org:8545/"));
    contract = new web3.eth.Contract(Contract_ABI, Contract_address);
  }
  const nonce = await web3.eth.getTransactionCount(from);
  const gasprice = await web3.eth.getGasPrice();
  const data = await contract.methods.refund(contract_id).encodeABI();
  const tx = {
    from: from,
    to: Contract_address,
    gas: 1000000,
    gasPrice: gasprice,
    data,
    nonce,
  };

  const signature = await web3.eth.accounts.signTransaction(tx, pk);
  const recepit = await web3.eth.sendSignedTransaction(signature.rawTransaction);
  console.log("Signed Transaction ", recepit);
  return recepit;
}

async function getContract(chainID , contractID , from) {
  if (chainID === '80002') {
    const conf = require('./build/contracts/HashedTimelock.json');
    Contract_address = conf.networks['80002'].address;
    const Contract_ABI = conf.abi;
    web3 = new Web3(new Web3.providers.HttpProvider('https://rpc-amoy.polygon.technology/'));
    contract = new web3.eth.Contract(Contract_ABI, Contract_address);
  }
  else if (chainID === '97') {
    const conf = require('../Binance/build/contracts/HashedTimelock.json');
    Contract_address = conf.networks['97'].address;
    const Contract_ABI = conf.abi;
    web3 = new Web3(new Web3.providers.HttpProvider("https://bsc-testnet.blockpi.network/v1/rpc/public"));
    contract = new web3.eth.Contract(Contract_ABI , Contract_address);
  }
  const data = await contract.methods.getContract(contractID).call({ from: from, gas: 1000000 })
  console.log(data);
  return data
}

async function withdrawal(contractID, secret, from, pk, chainID) {
  if (chainID === '80002') {
    const conf = require('./build/contracts/HashedTimelock.json');
    Contract_address = conf.networks['80002'].address;
    const Contract_ABI = conf.abi;
    web3 = new Web3(new Web3.providers.HttpProvider('https://rpc-amoy.polygon.technology/'));
    contract = new web3.eth.Contract(Contract_ABI, Contract_address);
  }
  else if (chainID === '97') {
    const conf = require('../Binance/build/contracts/HashedTimelock.json');
    Contract_address = conf.networks['97'].address;
    const Contract_ABI = conf.abi;
    web3 = new Web3(new Web3.providers.HttpProvider("https://data-seed-prebsc-2-s1.binance.org:8545/"));
    contract = new web3.eth.Contract(Contract_ABI, Contract_address);
  }
  const nonce = await web3.eth.getTransactionCount(from);
  const gasprice = await web3.eth.getGasPrice();
  const data = await contract.methods.withdraw(contractID, secret).encodeABI();
  const tx = {
    from: from,
    to: Contract_address,
    gas: 150000,
    gasPrice: gasprice,
    data,
    nonce,
  };

  const signature = await web3.eth.accounts.signTransaction(tx, pk);
  const receipt = await web3.eth.sendSignedTransaction(signature.rawTransaction);
  console.log("Signed Transaction ", receipt);
  return receipt
}

async function getEventsByBlockNumber(bn, chainID , rpc) {
  if (chainID === '80002') {
    const conf = require('./build/contracts/HashedTimelock.json');
    Contract_address = conf.networks['80002'].address;
    const Contract_ABI = conf.abi;
    web3 = new Web3(new Web3.providers.HttpProvider('https://rpc-amoy.polygon.technology/'));
    contract = new web3.eth.Contract(Contract_ABI, Contract_address);
  }
  else if (chainID === '97') {
    const conf = require('../Binance/build/contracts/HashedTimelock.json');
    Contract_address = conf.networks['97'].address;
    const Contract_ABI = conf.abi;
    web3 = new Web3(new Web3.providers.HttpProvider(rpc));
    contract = new web3.eth.Contract(Contract_ABI, Contract_address);
  }
  const events = await contract.getPastEvents('LogHTLCNew', {
    fromBlock: bn,
    toBlock: 'latest',
  });
  if (events.length > 0) {
    return events[events.length - 1];
  } else {
    return { msg: "no log found" };
  }
}

module.exports = { balance, getContract, newContract, withdrawal, refund, getEvents, getEventsByBlockNumber }







