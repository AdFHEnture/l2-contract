// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IMailbox} from "./IMailbox.sol";

contract AdContract {
    struct Ad {
        address payable advertiser;
        string websiteUrl;
        string imageUrl;
        uint256 createdAt;
        uint256 expiresAt;
        bool[5] adVector;
    }

    mapping(uint256 => Ad) public ads;
    uint256 public nextAdId;
    uint256 public constant COST_PER_SECOND = 0.01 ether;
    address public owner;
    IMailbox public mailbox;
    uint32 destinationChain;

    event AdCreated(
        uint256 indexed adId,
        address indexed advertiser,
        string websiteUrl,
        string imageUrl,
        uint256 expiresAt,
        bool[5] adVector,
        bytes32 channelMessageId,
        address recipient,
        uint32 destinationChain
    );

    constructor(address mailboxAddress, uint32 _destinationChain) {
        owner = msg.sender;
        mailbox = IMailbox(mailboxAddress);
        destinationChain = _destinationChain;
    }

    receive() external payable {}

    function createAd(
        string memory websiteUrl,
        string memory imageUrl,
        uint256 durationInSeconds,
        bool[5] memory adVector,
        address recipient
    ) external payable returns (bytes32) {
        // uint256 cost = durationInSeconds * COST_PER_SECOND;
        //require(msg.value >= cost, "Insufficient payment for the ad duration");
        Ad memory ad = Ad({
            advertiser: payable(msg.sender),
            websiteUrl: websiteUrl,
            imageUrl: imageUrl,
            createdAt: block.timestamp,
            expiresAt: block.timestamp + durationInSeconds,
            adVector: adVector
        });
        ads[nextAdId] = ad;

        bytes memory adBytesArray = new bytes(ad.adVector.length);
        for (uint i = 0; i < ad.adVector.length; i++) {
            if (ad.adVector[i]) {
                adBytesArray[i] = 0x01;
            } else {
                adBytesArray[i] = 0x00;
            }
        }

        bytes32 channelMessageId = mailbox.dispatch{value: msg.value}(
            destinationChain, // destinationDomain
            bytes32(uint256(uint160(recipient))), // recipientAddress
            bytes(adBytesArray) // messageBody
        );

        emit AdCreated(
            nextAdId,
            msg.sender,
            websiteUrl,
            imageUrl,
            block.timestamp + durationInSeconds,
            adVector,
            channelMessageId,
            recipient,
            destinationChain
        );

        nextAdId++;
        return channelMessageId;
    }
}
