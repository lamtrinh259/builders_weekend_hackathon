// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import { DAOMember } from "src/DAOMember.sol"; // This compiled fine, no error

contract DAOMemberScript is Script {
    function setUp() public {}

    function run() public {
        vm.broadcast();
        new DAOMember("Cool builders DAO");
    }
}
