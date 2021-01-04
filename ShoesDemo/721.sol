
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "../../github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol";
import "../../github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Counters.sol";

contract zzq721 is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    struct ProudItem {
        address _shoe_owner;
        uint256 _price;
    }
    
    mapping(uint256 => ProudItem) public ProudItems;
    

    constructor() public ERC721("NIKE", "NIKE") {}

    function awardItem(address player, string memory tokenURI, uint256 price)
        public
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(player, newItemId);
        _setTokenURI(newItemId, tokenURI);
        
        
        ProudItems[newItemId]._price = price;

        return newItemId;
    }
    
    function getprice(uint256 _newItemId) public view returns (uint) {
        return (
        ProudItems[_newItemId]._price);
       
        
    }
}