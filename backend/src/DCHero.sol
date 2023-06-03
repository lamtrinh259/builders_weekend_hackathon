// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import { DAOMember } from "./DAOMember.sol"; // This compiled fine, no error

contract DCHero {
    // keccak256(encodePacked(issuer, key)) => sha256(entityJson)
    mapping(bytes32 => bytes32) public credentials;

    event CredentialCreated(address issuer, string key, bytes32 lookupHash, bytes32 jsonHash);

    function convertDAOMemberDataToJsonhash(address memberAddress) public view returns (bytes32) {
        DAOMember daomember = DAOMember(memberAddress);
        (string memory name, uint age, bool hasNFT, address member, uint version) = daomember.getDAOMember(memberAddress);
        bytes memory memberData = abi.encode(name, age, hasNFT, member, version);
        bytes32 jsonHash = bytes32(memberData);
        return jsonHash;
    }

    function getLookupHash(
        address issuer, string calldata key
    ) public pure returns (bytes32) {
        return
            keccak256(abi.encodePacked(issuer, key
                )
            );
    }

    function createCredential(string calldata key, bytes32 jsonHash) public returns (bytes32) {
        bytes32 lookupHash = getLookupHash(msg.sender, key);
        if (credentials[lookupHash] == 0) {
            credentials[lookupHash] = jsonHash;
            emit CredentialCreated(msg.sender, key, lookupHash, jsonHash);
        }

        return lookupHash;
    }


    function lookupJsonHash(
        address issuer, string calldata key
    ) public view returns (bytes32) {
        return credentials[getLookupHash(issuer, key)];
    }


}
