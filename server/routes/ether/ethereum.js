const Web3 = require('web3'); // npm install web3
const abi = require('./abi'); // application binary interface
const contract = require('./contract'); // contract address on ropstenNET
const admin = require('./admin');
const web3 = new Web3(new Web3.providers.HttpProvider("ropsten.infura.io/v3/12bb32d6998c476886d79aa9c7434da3")); // Connection Ethereum node "INFURA" https://infura.io

const admincontent = web3.contract(abi.AdminContent); // object of Contract(AdminContent)'s abi
const ContractAdminContent = admincontent.at(contract.AdminContent); // object of Contract 

const _Administrator = web3.eth.accounts.privateKeyToAccount(admin.privatekey); // administrator's account 



//REGISTER
exports.registerUser = function(user){
    ContractAdminContent.RegisterUser(user)
}
exports.registerCopyright = function(hash){
    ContractAdminContent.RegisterCopyright(_Administrator,hash)
}

//CONTENT
exports.getOwner = function(hash){
    ContractAdminContent.getOwner(hash)
}
exports.getTimeC = function(hash){
    ContractAdminContent.getTime(hash)
}
exports.getBlockC = function(hash){
    ContractAdminContent.getBlock(hash)
}

//USER
exports.getNOC = function(user){
    ContractAdminContent.getNOC(user)
}
exports.getTimeU = function(user){
    ContractAdminContent.getTime(user)
}
exports.getBlockU = function(user){
    ContractAdminContent.getBlock(user)
}
exports.getContent = function(user){this.getNOC(user).then(NOC=>{
    ContractAdminContent.getContent(user,NOC)
})

}
