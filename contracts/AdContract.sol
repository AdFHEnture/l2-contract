// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IMailbox} from "./IMailbox.sol";

contract AdContract {
    // struct Ad {
    //     address payable advertiser; // Address of the advertiser
    //     string adTitle; // Title of the ad
    //     string adContent; // Content or description of the ad
    //     uint256 createdAt; // Timestamp when the ad was created
    //     uint256 expiresAt; // Timestamp when the ad expires
    //     uint256 budget; // Budget allocated for the ad
    //     bool isActive; // Flag indicating if the ad is active or not
    //     bool[5] adVector;
    // }

    struct miniCooperAd {
        address payable advertiser;
        string adTitle;
        bool[5] adVector;
    }

    // mapping(uint256 => Ad) public ads;
    // uint256 public nextAdId;
    // uint256 public constant COST_PER_SECOND = 0.01 ether; // Cost per second for the ad
    address public owner;
    IMailbox public mailbox; // Add the mailbox instance
    address destinationChain;

    // // Event emitted when a new ad is created
    // event AdCreated(
    //     uint256 indexed adId,
    //     address indexed advertiser,
    //     string adTitle,
    //     uint256 expiresAt,
    //     uint256 budget
    // );

    event MiniCooperAdCreated(
        address indexed advertiser,
        string adTitle,
        bool[5] adVector,
        bytes32 messageId,
        address destinationChain
    );

    // Constructor to set the owner of the contract and mailbox address
    constructor(address _mailboxAddress) {
        owner = msg.sender;
        mailbox = IMailbox(_mailboxAddress); // Initialize the mailbox instance
    }

    function miniCooper(address recipient) public returns (bytes32) {
        miniCooperAd memory somini = miniCooperAd({
            advertiser: payable(msg.sender),
            adTitle: "$MiniCooper",
            adVector: [false, true, true, false, false]
        });

        bytes memory bytesArray = new bytes(somini.adVector.length);
        for (uint i = 0; i < somini.adVector.length; i++) {
            if (somini.adVector[i]) {
                bytesArray[i] = 0x01;
            } else {
                bytesArray[i] = 0x00;
            }
        }

        bytes32 id = mailbox.dispatch{value: msg.value}(
            destinationChain, // destinationDomain
            bytes32(uint256(uint160(recipient))), // recipientAddress
            bytes(bytesArray) // messageBody
        );

        emit MiniCooperAdCreated(
            miniCooperAd.advertiser,
            miniCooperAd.adTitle,
            miniCooperAd.adVector,
            id,
            destinationChain
        );

        return id;
    }

    // Fallback function to receive ether
    receive() external payable {}

    // // Function to create a new ad
    // function createAd(
    //     string memory _adTitle,
    //     string memory _adContent,
    //     uint256 _durationInSeconds,
    //     uint256 _budget,
    //     bool[5] memory _adVector
    // ) external payable returns (bytes32) {
    //     uint256 cost = _durationInSeconds * COST_PER_SECOND;
    //     require(msg.value >= cost, "Insufficient payment for the ad duration");

    //     ads[nextAdId] = Ad({
    //         advertiser: payable(msg.sender),
    //         adTitle: _adTitle,
    //         adContent: _adContent,
    //         createdAt: block.timestamp,
    //         expiresAt: block.timestamp + _durationInSeconds,
    //         budget: _budget,
    //         isActive: true,
    //         adVector: _adVector
    //     });

    //     emit AdCreated(
    //         nextAdId,
    //         msg.sender,
    //         _adTitle,
    //         block.timestamp + _durationInSeconds,
    //         _budget
    //     );

    //     bytes memory bytesArray = new bytes(_adVector.length);
    //     for (uint i = 0; i < _adVector.length; i++) {
    //         if (_adVector[i]) {
    //             bytesArray[i] = 0x01;
    //         } else {
    //             bytesArray[i] = 0x00;
    //         }
    //     }

    //     bytes32 id = mailbox.dispatch{value: msg.value}(
    //         97, // destinationDomain
    //         bytes32(uint256(uint160(recipient))), // recipientAddress
    //         bytes(bytesArray) // messageBody
    //     );

    //     // Increment the nextAdId
    //     nextAdId++;
    //     return id;
    // }

    // // Function to retrieve the cost for a given duration
    // function calculateCost(
    //     uint256 _durationInSeconds
    // ) external pure returns (uint256) {
    //     return _durationInSeconds * COST_PER_SECOND;
    // }

    // // Function to extend an ad's duration
    // function extendAd(
    //     uint256 _adId,
    //     uint256 _additionalDurationInSeconds
    // ) external payable {
    //     require(_adId < nextAdId, "Invalid ad ID");

    //     Ad storage ad = ads[_adId];
    //     require(ad.isActive, "Ad is not active");

    //     uint256 newExpiresAt = ad.expiresAt + _additionalDurationInSeconds;
    //     uint256 cost = _additionalDurationInSeconds * COST_PER_SECOND;
    //     require(
    //         msg.value >= cost,
    //         "Insufficient payment to extend the ad duration"
    //     );

    //     ad.expiresAt = newExpiresAt;

    //     // Refund excess payment
    //     if (msg.value > cost) {
    //         payable(msg.sender).transfer(msg.value - cost);
    //     }
    // }

    // // Function to deactivate an ad
    // function deactivateAd(uint256 _adId) external {
    //     require(_adId < nextAdId, "Invalid ad ID");

    //     Ad storage ad = ads[_adId];
    //     require(
    //         ad.advertiser == msg.sender,
    //         "Only advertiser can deactivate the ad"
    //     );

    //     ad.isActive = false;
    // }

    // // Withdraw funds from the contract (for contract owner)
    // function withdraw(uint256 _amount) external {
    //     require(msg.sender == owner, "Only contract owner can withdraw funds");
    //     require(
    //         address(this).balance >= _amount,
    //         "Insufficient contract balance"
    //     );

    //     payable(msg.sender).transfer(_amount);
    // }
}
