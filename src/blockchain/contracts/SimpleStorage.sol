// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import "./PriceConsumerV3.sol";

contract SimpleStorage is PriceConsumerV3 {
    mapping(address => uint256) public users;
    address owner;
    address[] public funders;

    address kovan = 0x8A753747A1Fa494EC906cE90E9f37563A8AF630e;
    address rinkeby = 0x8A753747A1Fa494EC906cE90E9f37563A8AF630e;

    constructor() public PriceConsumerV3(rinkeby) {
        owner = msg.sender;
    }

    function fundMe() public payable {
        require(
            getConversionRate(uint256(msg.value)) >= minimum,
            "Need to spend more ETH !!!"
        );
        users[msg.sender] += msg.value;
        funders.push(msg.sender);
    }

    modifier onlyOwner() {
        require(msg.sender == owner); // ONLY OWNER CAN WITHDRAW.
        _;
    }

    function withdraw() public payable onlyOwner {
        payable(msg.sender).transfer(address(this).balance);

        for (uint256 index = 0; index > funders.length; index++) {
            address funder = funders[index];
            users[funder] = 0;
        }

        funders = new address[](0);
    }

    function getTotal() public view returns (uint256) {
        return address(this).balance;
    }
}
