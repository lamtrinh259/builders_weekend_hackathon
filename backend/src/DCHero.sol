// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import { DAOMember } from "./DAOMember.sol"; // This compiled fine, no error
// import "openzeppelin-contracts/contracts/utils/cryptography/ECDSA.sol";
// import "openzeppelin-contracts/contracts/utils/cryptography/EIP712.sol";
// import "openzeppelin-contracts/contracts/metatx/MinimalForwarder.sol";

contract DCHero{
    // keccak256(encodePacked(issuer, key)) => sha256(entityJson)
    mapping(address => bytes32) public credentialFormats;
    mapping(address => bytes32) public credentials;

    event CredentialFormatCreated(address issuer, bytes32 credentialFormatHash);
    event CredentialCreated(address issuer, bytes32 credentialHash);
    event MemberAdded(string name, uint age, bool hasNFT, address wallet);

    DAOMember public members = new DAOMember("DCHero DAO");

    bool here = true;

    struct Credential {
      string string_field;
      uint int_field;
      bool bool_field;
      address address_field;
    }

    struct proofRequestFormat {
      string name;
      bool over18;
      bool hasNFT;
    }

    // /**
    // @param _name name of the person holding the credential
    // @param _age age of the person holding the credential
    // @param _hasNFT whether the person holding the credential has the DAOMember NFT
    // @param _wallet address of the person holding the credential
    // @return credentialFormat the keccak256 hash of the credential
    // @dev not sure if bytes32 is the best type for the credentialFormat
    //  */
    function createCredentialFormat(string memory _name, uint _age, bool _hasNFT, address _wallet) public returns (bytes32) {
        Credential memory credential;
        credential.string_field = _name;
        credential.int_field = _age;
        credential.bool_field = _hasNFT;
        credential.address_field = _wallet;

        bytes memory credentialData = abi.encodePacked(credential.string_field, credential.int_field, credential.bool_field, credential.address_field);
        bytes32 credentialFormat = keccak256(credentialData);
        credentialFormats[msg.sender] = credentialFormat; // Store the newly created credentialFormat
        emit CredentialFormatCreated(msg.sender, credentialFormat);

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

    // function createCredential(string calldata key, bytes32 jsonHash) public returns (bytes32) {
    //     bytes32 lookupHash = getLookupHash(msg.sender, key);
    //     if (credentials[lookupHash] == 0) {
    //         credentials[lookupHash] = jsonHash;
    //         emit CredentialCreated(msg.sender, key, lookupHash, jsonHash);
    //     }
    //     return lookupHash; // Should print out the lookupHash on the front-end
    // }

    function createCredential(string memory _name, uint _age, bool _hasNFT, address _wallet) public returns (bytes32) {
        bytes memory credentialData = abi.encodePacked(_name, _age, _hasNFT, _wallet);
        bytes32 credentialHash = keccak256(credentialData);
        emit CredentialCreated(msg.sender, credentialHash);
        members.addDAOMember(_name, _age, _hasNFT, _wallet); // Add member to DAO at the same time
        emit MemberAdded(_name, _age, _hasNFT, _wallet);
        return credentialHash; // Should print out the credentialHash on the front-end
    }

    /// Function to generate proof request
    /// @dev not sure if bytes32 is the best type for the proof request
    function createProofRequest(string memory name, bool over18, bool hasNFT) public pure returns (proofRequestFormat memory proofRequest, bytes32) {
        bytes32 proofRequestHash = keccak256(abi.encodePacked(name, over18, hasNFT));
        // return proofRequestHash;
        // proofRequestFormat memory proofRequest;
        proofRequest.name = name;
        proofRequest.over18 = over18;
        proofRequest.hasNFT = hasNFT;
        return (proofRequest, proofRequestHash);
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
    function verifyProof(bytes32 proofRequest) public returns (bool) {
        // Unpack the proof request
        (string memory name, bool over18, bool hasNFT) = unpackProofRequest(proofRequest);

        // address signer = _hashTypedDataV4(keccak256(abi.encode(
        //     keccak256("proofRequestFormat(string name,bool over18,bool hasNFT)"),
        //     proofRequest.name,
        //     proofRequest.over18,
        //     proofRequest.hasNFT
        // ))).recover(signature);

        // (string memory memberName, uint memberAge, bool memberHasNFT, ) = members.getDAOMember(signer);

        // Get the member's credential from the DAOMember contract, address is unused, so was left out of the function return
        (string memory memberName, uint memberAge, bool memberHasNFT, ) = members.getDAOMember(msg.sender);

        // Check for attribute matches based on flexible comparison logic
        bool nameMatch = (keccak256(abi.encodePacked(name)) == keccak256(abi.encodePacked(memberName)));
        bool ageMatch = !over18 || (memberAge > 18);
        bool hasNFTMatch = !hasNFT || (hasNFT == memberHasNFT);

        // Return true if all of the requirements match
        return nameMatch && ageMatch && hasNFTMatch;
    }

    // To-do: implement function using zkp to prove that the user has the credential in response to the proof request
    function verifyProofZKP(bytes32 proofRequest) public pure returns (bytes32) {
        // TODO: Implement this function
        revert("Not implemented yet");
    }

    // function lookupJsonHash(address issuer, string calldata key) public view returns (bytes32) {
    //     return credentials[getLookupHash(issuer, key)];
    // }


}
