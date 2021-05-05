const CryptoverseGame = artifacts.require("CryptoverseGame");

module.exports = function(deployer) {
  deployer.deploy(CryptoverseGame);
};
