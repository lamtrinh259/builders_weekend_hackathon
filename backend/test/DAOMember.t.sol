// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "ds-test/test.sol";
import "../src/DAOMember.sol";

// Mock a user that is not owner of the contract
contract User {
  function callOnlyOwner(DAOMember m) public view{
    m.onlyOwner();
  }
}

contract DAOMemberTest is DSTest {
    DAOMember main;
    User user;

    function setUp() public {
      main = new DAOMember("Cool builders DAO");
      user = new User();
    }

    function testOwner() public {
        assertEq(main.owner(),address(this));
    }

    function testFailOwner() public view{
       user.callOnlyOwner(main);
    }

    function testWrongOwner() public view{
        user.callOnlyOwner(main); // This test will fail
    }
}
