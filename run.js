//设置web3连接
var Web3 = require('web3');
//http://localhost:7545 为Ganache提供的节点链接
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
//读取合约
var fs = require('fs');
var contractCode = {     //注意这里的变化
    "strings.sol":fs.readFileSync('strings.sol').toString(),
    "Hello.sol":fs.readFileSync('Hello.sol').toString()
};
//编译合约代码
var solc = require('solc');
var compileCode = solc.compile({    //注意这里的变化
    sources:contractCode
},1);
//获取合约abi和字节码
//获取合约abi和字节码
var abi = JSON.parse(compileCode.contracts['Hello.sol:Hello'].interface);  //注意这里的变化
var byteCode = compileCode.contracts['Hello.sol:Hello'].bytecode; 
//创建合约对象
var VotingContract = web3.eth.contract(abi);
//0xbf474d24ba8b19811db5deb51137ddccbe3ff288为合约部署地址
var contractInstance = VotingContract.at("0x7f6f8679f8856b2e671e7a9a46981b6636e3aa50");

var result = contractInstance.say.call('berry');
console.log(result);