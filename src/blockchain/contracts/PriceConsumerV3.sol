// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {
    string NETWORK = "rinkeby";
    uint256 internal GWEI_DECIMAL = 100000000;
    uint256 internal WEI_DECIMAL = 1000000000000000000;
    uint256 internal minimum = (50 * 10**18) / WEI_DECIMAL;

    mapping(string => address) private networks;

    AggregatorV3Interface internal priceFeed;

    /**
     * Network: rinkeby
     * Aggregator: ETH/USD
     * Address: 0x8A753747A1Fa494EC906cE90E9f37563A8AF630e
     */
    constructor() {
        networks["kovan"] = 0x8A753747A1Fa494EC906cE90E9f37563A8AF630e;
        networks["rinkeby"] = 0x8A753747A1Fa494EC906cE90E9f37563A8AF630e;

        priceFeed = AggregatorV3Interface(networks[NETWORK]);
    }

    /**
     * Returns the latest price
     */
    function getLatestPrice() internal view returns (int256) {
        (
            ,
            // uint80 roundID,
            int256 price, // uint startedAt, // uint timeStamp, // uint80 answeredInRound
            ,
            ,

        ) = priceFeed.latestRoundData();
        return price;
    }

    function getConversionRate(uint256 amount) internal view returns (uint256) {
        uint256 price = uint256(getLatestPrice()) / GWEI_DECIMAL;
        return (price * amount) / WEI_DECIMAL;
    }

    function getUSDConversion() public view returns (uint256) {
        return uint256(getLatestPrice()) / GWEI_DECIMAL;
    }
}
