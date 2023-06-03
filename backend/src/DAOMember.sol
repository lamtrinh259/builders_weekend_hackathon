// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
// remappings done in both .gitmodules & remappings.txt
// import "openzeppelin/contracts/utils/Counters.sol"; // Can't find this in openzeppelin, also don't need this
import "openzeppelin/security/ReentrancyGuard.sol";
import "forge-std/Base.sol";

contract DAOMember is ReentrancyGuard {
  address public owner;
  string public DAOName;

  constructor(string memory _DAOName){
    owner = msg.sender;
    DAOName = _DAOName;
  }

  function onlyOwner() public view{
    require(msg.sender == owner, "Not the owner");
  }

  // This function is for testing and serves no real purpose
  function DAOGreet() public pure returns(string memory) {
    return "Hello from DAO";
  }

  struct DAOMember {
    string name;
    uint age;
    bool hasNFT;
    address member;
  }

  DAOMember[] public members;
  // mapping EOA address to member ID
  mapping(address => uint256) private memberIds;

  event MemberAdded(address indexed eoa, uint256 memberId);
  event MemberDeleted(address indexed eoa, uint256 memberId);

  function addDAOMember(string memory _name, uint _age, bool _hasNFT, address _member)
    public {
    onlyOwner(); // Only owner should be able to add member
    require(memberIds[_member] == 0, "Member already exists");
    uint256 memberId = members.length;
    members.push(DAOMember(_name, _age, _hasNFT, _member));
    memberIds[_member] = memberId;
    emit MemberAdded(_member, memberId);
  }

  function deleteDAOMember(address _member) public {
    onlyOwner(); // Only owner should be able to delete member
    uint256 memberId = memberIds[_member];
    require(memberId != 0, "Member does not exist");
    delete members[memberId];
    delete memberIds[_member];
    emit MemberDeleted(_member, memberId);
  }

  function getDAOMember(address _member) public view returns (string memory, uint, bool, address) {
    uint256 memberId = memberIds[_member];
    return (
      members[memberId].name,
      members[memberId].age,
      members[memberId].hasNFT,
      members[memberId].member
    );
  }

  function getAllDAOMembersList() public view returns (DAOMember[] memory) {
    return members;
  }

  function getMemberCount() public view returns (uint256) {
    return members.length;
  }

}
