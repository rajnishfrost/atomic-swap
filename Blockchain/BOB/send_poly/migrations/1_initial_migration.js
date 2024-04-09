const Migrations = artifacts.require("HashedTimelock");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
