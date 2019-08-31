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

    web3.eth.personal.unlockAccount("0xC57B92Cef010F624455d76D20A13ACf23Bcb3e22", "2600###pes", 600).then(console.log('Account unlocked!'));

    let data = this.web3.eth.abi.encodeFunctionCall({
        name: 'RegisterUser',
        type: 'function',
        inputs:[{
            type:'address',
            name:'_user'
        }]
    });
    web3.eth._Administrator.signTransaction({
        from: _Administrator.address,
        gas: "21000",
        to: '0xbb3458592f8aa1b98a6a4d38b5ee22e5ae6ebe14',
        value: "",
        data: data
    }).then( tx => {
        var Transaction = tx.rawTransaction;
        web3.eth.sendSignedTransaction(Transaction).on('receipt',console.log);
    });
    
}
exports.registerCopyright = function(_owner,hash,ether){

    web3.eth.personal.unlockAccount("0xC57B92Cef010F624455d76D20A13ACf23Bcb3e22", "2600###pes", 600).then(console.log('Account unlocked!'));

    let data = this.web3.eth.abi.encodeFunctionCall({
        name: 'RegisterCopyright',
        type: 'function',
        inputs:[{
            type: "address",
            name: "_owner"
        },
        {
            type: "string",
            name: "_hash"
        },
        {
            type: "uint256",
            name: "_Ether"
        }
        ]
    });
    web3.eth._Administrator.signTransaction({
        from: _Administrator.address,
        gas: "21000",
        to: '0xbb3458592f8aa1b98a6a4d38b5ee22e5ae6ebe14',
        data: data
    },admin.privatekey).then( tx => {
        var Transaction = tx.rawTransaction;
        web3.eth.sendSignedTransaction(Transaction).on('receipt',console.log);
    });
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
