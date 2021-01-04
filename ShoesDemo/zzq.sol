// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
import "./721.sol";

//changjia:0x50CAB181DAf1fca71f3BDe3AA65C7F2c769B0B4D
//kuaidi:0xa7A9a8F7Ec1dCc3E35669Eb0Dc90D2A589AF64eb
//buyer:0xe2CeFfaf70AF3DbDDfE5b32CE08C8D61644c3439

contract owned {
    address payable owner;

    // Contract constructor: set owner
    constructor() public {
        owner = msg.sender;
    }

    // Access control modifier
    modifier onlyOwner {
        require(
            msg.sender == owner,
            "Only the contract owner can call this function"
        );
        _;
    }
}

contract Zzq is owned {
    zzq721 private condi;

    mapping(address => string[]) public UserProdMap;
    string[] public AllItems;

    constructor() public {
        condi = new zzq721();
    }

  
    //生产鞋子
    function produce(string memory _name,uint256 _price) public onlyOwner {
        condi.awardItem(address(this), _name, _price);
        AllItems.push(_name);
        string[] storage user_Prod;
        user_Prod = UserProdMap[msg.sender];
        user_Prod.push(_name);
        UserProdMap[msg.sender] = user_Prod;

    }
    
    //总生产
    function getTotalSupply() public view returns (uint256) {
        return condi.totalSupply();
    }
    
    //获取所有人
    function getOwner(uint32 tokenId) public view returns (address) {
        return condi.ownerOf(tokenId);
    }
    
    //购买
    function buy(uint256 tokenId) public payable returns(bool) {
        require(msg.value == condi.getprice(tokenId));
        condi.safeTransferFrom(address(this), 0xa7A9a8F7Ec1dCc3E35669Eb0Dc90D2A589AF64eb, tokenId);
        return true;    
    }
    
    //确认送达
    function accept(uint256 tokenId) public {
        address(uint256(0x50CAB181DAf1fca71f3BDe3AA65C7F2c769B0B4D)).transfer(condi.getprice(tokenId));
    }

    function shouquan() public returns(bool) {
        condi.setApprovalForAll(address(this),true);
    } 

    function getUserBalance(address _user) public view returns (uint256) {
        return condi.balanceOf(_user);
    }


    function getAllBalance() public view returns (uint256) {
        return condi.balanceOf(address(this));
    }


    function getProdId(uint256 _Index) public view returns (string memory r_token, uint256 r_index) {
        uint256 _token = condi.tokenOfOwnerByIndex(msg.sender, _Index);
        return (condi.tokenURI(_token), _token);
    }
    
    function getAllProdId(uint256 _Index) public view returns (string memory r_token, uint256 r_index, uint256 r_price) {
        uint256 _token = condi.tokenOfOwnerByIndex(address(this), _Index);
        return (condi.tokenURI(_token), _token, condi.getprice(_token));
    }
    
    function getprices(uint256 _Index) public view returns (uint256 r_price) {
        uint256 _token = condi.tokenOfOwnerByIndex(address(this), _Index);
        return (condi.getprice(_token));
    }
 
    function ErcAddress() public view returns (zzq721) {
        return condi;
    }

    // 厂家体现
    // function drawMoney(uint256 _value) public onlyOwner {
    //     address(uint160(0x50CAB181DAf1fca71f3BDe3AA65C7F2c769B0B4D)).transfer(_value);
    //     return;
    // }

    // 得到合约里面的eth余额
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }



}
