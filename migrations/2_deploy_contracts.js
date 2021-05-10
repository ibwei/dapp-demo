var HelloContract = artifacts.require("./Hello.sol");

module.exports = function(deployer) {
  //部署string.sol合约
  deployer.deploy(HelloContract);
};
