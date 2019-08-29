pragma solidity >=0.4.9 <0.6.0;

// Contract's Owner
contract Owned {
 
    address public administrator; // Administrator's address
   
    // Transfer owner event
    event TransferAdmin(address oldaddr, address newaddr);

    // Modifier only administrator
    modifier onlyadministrator() { if (msg.sender != administrator) revert(); _; }

    // Constructor  
    constructor() public {
        administrator = msg.sender; // Administrator is account who create contract first
    }
    
    // Transfer owner function
    function transferAdmin(address _new) onlyadministrator public {
        address oldaddr = administrator;
        administrator = _new;
        emit TransferAdmin(oldaddr, administrator);
    }
}

contract AdminContent is Owned {
    
    mapping(address => userinfo) User;
    mapping(string => contentinfo) Content;
    mapping(string => receiptinfo) Receipt;
    
    // Content's structure
    struct contentinfo{
        address payable Owner; // Content's Owner
        uint Time; // Content's time registered
        uint Block; // Content's block registered
        uint Ether;
    }
        
    // User's structure
    struct userinfo{
        uint NOC; // The number of content
        uint Time; // User's time registered
        uint Block; // User's block registered
        mapping(uint => string) Content; // Owner's content string 
    }
    
    // Receipt structure
    struct receiptinfo{
        uint TotalTraffic; // Total traffic a day about a content
        uint YourTraffic; // Assistant's traffic a day abount a content
        uint TotalRevenue; // Total Revenue a day about a content
        uint Reward; // Reward recevied for assistant a day about a content
    }
    
    // Administartor register User on Ethereum
    function RegisterUser(address _user) onlyadministrator public {
        User[_user].NOC == 0;
        User[_user].Time = now;
        User[_user].Block = block.number;
    }

    // Administrator register Copyright for Content
    function RegisterCopyright(address payable _owner , string memory _hash, uint _Ether) onlyadministrator public {
        uint NOC = getNOC(_owner);
        Content[_hash] = contentinfo(_owner,now,block.number, _Ether);
        User[_owner].Content[NOC] = _hash;
        User[_owner].NOC += 1;
    }
    
    // Get content's owner
    function getOwner (string memory _hash) view public returns(address payable){
        return Content[_hash].Owner;
    }
    
    // Get content's time registered
    function getTimeC (string memory _hash) view public returns(uint){
        return Content[_hash].Time;
    }
    
    // Get content's block registered
    function getBlock (string memory _hash) view public returns(uint){
        return Content[_hash].Block;
    }
    
    // Get content's block registered
    function getEther (string memory _hash) view public returns(uint){
        return Content[_hash].Ether;
    }
    
    // Get user's the number of content
    function getNOC (address _user) view public returns(uint){
        return User[_user].NOC;
    }
    
    // Get user's time registered
    function getTimeU (address _user) view public returns(uint){
        return User[_user].Time;
    }
    
     // Get user's block registered
    function getBlock (address _user) view public returns(uint){
        return User[_user].Block;
    }
    
    // Get user's content
    function getContent (address _user , uint index) view public returns(string memory){
        return User[_user].Content[index];
    }
}

contract Market is Owned {
    
    AdminContent admincontent = AdminContent(0x00696224ea99098a0b784edcd43d91649572dd1f00); // AdminContent Contract
    
    uint Revenue;
    // user: assistant, Contr: Contribution _hash: file
    function TransferReward (address payable user, uint Contr, string memory hash) onlyadministrator public payable{
        
        // Transfer 10% of total Revenue depending on contribution 
        user.transfer(Contr*admincontent.getEther(hash)*1 ether/1000);
    }
    
    // Content's owner take reword
    // clientSide set msg.value
    function Purchase (string memory hash) public payable {
        admincontent.getOwner(hash).transfer(msg.value*7/10);
        Revenue += msg.value*3/10;
    }
    
}