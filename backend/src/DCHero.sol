// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import { DAOMember } from "./DAOMember.sol"; // This compiled fine, no error

contract DCHero {
    // keccak256(encodePacked(issuer, key)) => sha256(entityJson)
    mapping(bytes32 => bytes32) public credentials;

    event CredentialCreated(address issuer, string key, bytes32 lookupHash, bytes32 jsonHash);

    DAOMember public members;

    struct Credential {
      string name;
      uint age;
      bool hasNFT;
      address wallet;
    }

    /**
    @param _name name of the person holding the credential
    @param _age age of the person holding the credential
    @param _hasNFT whether the person holding the credential has the DAOMember NFT
    @param _wallet address of the person holding the credential
    @return credentialFormat the keccak256 hash of the credential
    @dev not sure if bytes32 is the best type for the credentialFormat
     */
    function createCredentialFormat(string memory _name, uint _age, bool _hasNFT, address _wallet) public pure returns (bytes32) {
        Credential memory credential;
        credential.name = _name;
        credential.age = _age;
        credential.hasNFT = _hasNFT;
        credential.wallet = _wallet;

        bytes memory credentialData = abi.encodePacked(credential.name, credential.age, credential.hasNFT, credential.wallet);
        bytes32 credentialFormat = keccak256(credentialData);

        return credentialFormat;
    }

    function convertDAOMemberDataToJsonhash(address memberAddress) public view returns (bytes32) {
        DAOMember daomember = DAOMember(memberAddress);
        (string memory name, uint age, bool hasNFT, address member) = daomember.getDAOMember(memberAddress);
        bytes memory memberData = abi.encode(name, age, hasNFT, member);
        bytes32 jsonHash = bytes32(memberData);
        return jsonHash;
    }

    function getLookupHash(address issuer, string calldata key) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(issuer, key));
    }

    function createCredential(string calldata key, bytes32 jsonHash) public returns (bytes32) {
        bytes32 lookupHash = getLookupHash(msg.sender, key);
        if (credentials[lookupHash] == 0) {
            credentials[lookupHash] = jsonHash;
            emit CredentialCreated(msg.sender, key, lookupHash, jsonHash);
        }
        return lookupHash; // Should print out the lookupHash on the front-end
    }

    /// Function to generate proof request
    /// @dev not sure if bytes32 is the best type for the proof request
    function createProofRequest(string memory name, bool over18, bool hasNFT) public pure returns (bytes32) {
        bytes32 proofRequest = keccak256(abi.encodePacked(name, over18, hasNFT));
        return proofRequest;
    }

    /// Function to unpack proof request
    /// @dev this is a helper function to be used in case zkp doesn't work out
    function unpackProofRequest(bytes32 proofRequest) public pure returns (string memory name, bool over18, bool hasNFT) {
        // Extract the individual attributes from the proofRequest
        bytes memory proofRequestBytes = abi.encodePacked(proofRequest);

        // Ensure the proofRequest is of the expected length
        require(proofRequestBytes.length == 65, "Invalid proofRequest");

        // Unpack the attributes from the proofRequest
        assembly {
            // Skip the first 32 bytes (proofRequest length prefix)
            let offset := add(proofRequestBytes, 32)
            // Read the name attribute (string)
            name := mload(offset)
            // Increment the offset by the length of the name
            offset := add(offset, mload(name))
            // Read the over18 attribute (bool)
            over18 := mload(offset)
            // Increment the offset by 32 bytes (bool size)
            offset := add(offset, 32)
            // Read the hasNFT attribute (bool)
            hasNFT := mload(offset)
        }
    }

    /// Function to verify proof request using non-zkp method with flexible comparison logic
    function verifyProof(bytes32 proofRequest) public view returns (bool) {
        // Unpack the proof request
        (string memory name, bool over18, bool hasNFT) = unpackProofRequest(proofRequest);

        // Get the member's credential from the DAOMember contract
        (string memory memberName, uint memberAge, bool memberHasNFT, address memberAddress) = members.getDAOMember(msg.sender);

        // Check for attribute matches based on flexible comparison logic
        bool nameMatch = (keccak256(abi.encodePacked(name)) == keccak256(abi.encodePacked(memberName)));
        bool ageMatch = (memberAge > 18);
        bool hasNFTMatch = (hasNFT == memberHasNFT);

        // Return true if any attribute matches
        return nameMatch || ageMatch || hasNFTMatch;
    }

    // To-do: implement function using zkp to prove that the user has the credential in response to the proof request
    function verifyProofZKP(bytes32 proofRequest) public pure returns (bytes32) {
        // TODO: Implement this function
        revert("Not implemented yet");
    }

    function lookupJsonHash(address issuer, string calldata key) public view returns (bytes32) {
        return credentials[getLookupHash(issuer, key)];
    }


}