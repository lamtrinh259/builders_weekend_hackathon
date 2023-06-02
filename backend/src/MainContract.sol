// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
// need remapping
import "openzeppelin/interfaces/IERC20.sol";
import "forge-std/Base.sol";

contract Counter {
    uint256 public number;

    function setNumber(uint256 newNumber) public {
        number = newNumber;
    }

    function increment() public {
        number++;
    }
}
