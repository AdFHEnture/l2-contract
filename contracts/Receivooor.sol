// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Receivooor {
    event Receiveeed(uint32, bytes32, uint, string);
    function handle(
        uint32 _origin,
        bytes32 _sender,
        bytes calldata _data
    ) external payable returns(string memory, uint32) {
        emit Receiveeed(_origin, _sender, msg.value, string(_data));
        return (string(_data), _origin);
    }

    receive() external payable {}
}
