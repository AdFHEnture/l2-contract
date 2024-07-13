// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IMailbox} from "./IMailbox.sol";

contract AdContract {
    struct Ad {
        address payable advertiser; // Address of the advertiser
        string adTitle; // Title of the ad
        string adContent; // Content or description of the ad
        uint256 createdAt; // Timestamp when the ad was created
        uint256 expiresAt; // Timestamp when the ad expires
        uint256 budget; // Budget allocated for the ad
        bool isActive; // Flag indicating if the ad is active or not
        bool[5] adVector;
    }

    mapping(uint256 => Ad) public ads;
    uint256 public nextAdId;
    uint256 public constant COST_PER_SECOND = 0.01 ether;
    address public owner;
    IMailbox public mailbox;
    uint32 destinationChain;

    // Event emitted when a new ad is created
    event AdCreated(
        uint256 indexed adId,
        address indexed advertiser,
        string adTitle,
        uint256 expiresAt,
        uint256 budget,
        bool[5] adVector
    );

    constructor(address mailboxAddress) {
        owner = msg.sender;
        mailbox = IMailbox(mailboxAddress); // Initialize the mailbox instance
    }

    receive() external payable {}

    // Function to create a new ad
    function createAd(
        string memory adTitle,
        string memory adContent,
        uint256 durationInSeconds,
        uint256 budget,
        bool[5] memory adVector
    ) external payable returns (bytes32) {
        uint256 cost = durationInSeconds * COST_PER_SECOND;
        require(msg.value >= cost, "Insufficient payment for the ad duration");

        ads[nextAdId] = Ad({
            advertiser: payable(msg.sender),
            adTitle: adTitle,
            adContent: adContent,
            createdAt: block.timestamp,
            expiresAt: block.timestamp + durationInSeconds,
            budget: budget,
            isActive: true,
            adVector: adVector
        });

        emit AdCreated(
            nextAdId,
            msg.sender,
            adTitle,
            block.timestamp + durationInSeconds,
            budget,
            adVector
        );

        nextAdId++;
        return bytes32(nextAdId - 1);
    }

}
