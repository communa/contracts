//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract CommunaRouter {
    address private wallet;
    uint256 private percentage = 5;

    constructor(address _wallet) {
        wallet = _wallet;
    }

    function pay(address _to, IERC20 _token, uint256 _amount) public {
        uint256 amountFee = (_amount * percentage) / 100;
        uint256 amountFinal = _amount - amountFee;

        _token.transferFrom(msg.sender, wallet, amountFee);
        _token.transferFrom(msg.sender, _to, amountFinal);
    }
}
