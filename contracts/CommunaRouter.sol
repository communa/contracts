// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @notice Communa Network payment router
 */
contract CommunaRouter is Ownable {
    address private wallet;
    uint256 private percentage = 5;

    constructor(address _wallet) {
        wallet = _wallet;
    }

    function pay(
        address _to,
        address _token,
        uint256 _amount
    ) external payable {
        IERC20(_token).transferFrom(msg.sender, address(this), _amount);

        uint256 amountFee = (_amount * percentage) / 100;
        uint256 amountFinal = _amount - amountFee;

        IERC20(_token).transfer(wallet, amountFee);
        IERC20(_token).transfer(_to, amountFinal);
    }
}
