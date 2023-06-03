// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "openzeppelin/token/ERC721/extensions/ERC721URIStorage.sol";
// Didn't use the Ownable, so that this could actually compile
import "openzeppelin/access/Ownable.sol";

contract DAOMembershipNFT is ERC721URIStorage {  // Removed the Ownable part from this
    uint256 private _tokenIdCounter;

    constructor() ERC721("DAO Membership NFT", "Fish NFT") {
        msg.sender;
    }

    function tokenURI(uint256 tokenId) public view override(ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721URIStorage) {
        super._burn(tokenId);
    }

    // Removed the onlyOwner from this to let everyone mint!
    function mintNFT(address recipient, string memory tokenURI) public returns (uint256) {

        uint256 newItemId = _tokenIdCounter;
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        _tokenIdCounter += 1;
        return newItemId;
    }
}
