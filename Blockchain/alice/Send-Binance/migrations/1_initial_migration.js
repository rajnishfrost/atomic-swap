const Migrations = artifacts.require("HashedTimelock");

module.exports = function(deployer) {
  const gasPrice = web3.utils.toWei('50', 'gwei'); // Specify gas price in gwei
  deployer.deploy(Migrations, { gasPrice: gasPrice });
};
