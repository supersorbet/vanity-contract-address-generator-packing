// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

contract VanityFactoryExample {
    function deploy(bytes32 salt, bytes memory bytecode) public returns (address) {
        address addr;
        assembly {
            addr := create2(0, add(bytecode, 0x20), mload(bytecode), salt)
            if iszero(extcodesize(addr)) { revert(0, 0) }
        }
        return addr;
    }
}
