// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract UserCredentials {
    struct Credentials {
        string name;
        int age;
        bool hasDAONFT;
    }

    mapping(address => Credentials) private userCredentials;

    /**
     * @dev Set user credentials
     * @param name User's name
     * @param age User's age
     * @param hasDAONFT Whether the user has a DAO NFT or not
     */
    function setCredentials(string memory name, int age, bool hasDAONFT) public {
        userCredentials[msg.sender] = Credentials(name, age, hasDAONFT);
    }

    /**
     * @dev Get user credentials
     * @return name User's name
     * @return age User's age
     * @return hasDAONFT Whether the user has a DAO NFT or not
     */
    function getCredentials() public view returns (string memory name, int age, bool hasDAONFT) {
        Credentials memory credentials = userCredentials[msg.sender];
        return (credentials.name, credentials.age, credentials.hasDAONFT);
    }
}