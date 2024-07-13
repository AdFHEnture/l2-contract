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
        uint256 budget
    );

    constructor(address _mailboxAddress) {
        owner = msg.sender;
        mailbox = IMailbox(_mailboxAddress); // Initialize the mailbox instance
    }

    receive() external payable {}

    // Function to create a new ad
    function createAd(
        string memory _adTitle,
        string memory _adContent,
        uint256 _durationInSeconds,
        uint256 _budget,
        bool[5] memory _adVector
    ) external payable returns (bytes32) {
        uint256 cost = _durationInSeconds * COST_PER_SECOND;
        require(msg.value >= cost, "Insufficient payment for the ad duration");

        ads[nextAdId] = Ad({
            advertiser: payable(msg.sender),
            adTitle: _adTitle,
            adContent: _adContent,
            createdAt: block.timestamp,
            expiresAt: block.timestamp + _durationInSeconds,
            budget: _budget,
            isActive: true,
            adVector: _adVector
        });

        emit AdCreated(
            nextAdId,
            msg.sender,
            _adTitle,
            block.timestamp + _durationInSeconds,
            _budget
        );

        nextAdId++;
        return bytes32(nextAdId - 1);
    }

}
