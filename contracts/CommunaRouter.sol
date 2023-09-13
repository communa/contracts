// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract CommunaRouter {
    address private wallet;
    address private token = 0x009fd1a3BE53F53beA7D5E67080558BB35843B30;
    uint256 private percentage = 5;

    constructor(address _wallet) {
        wallet = _wallet;
    }

    // function transfer(uint _value) public {
    //     IERC20(token).transferFrom(msg.sender, address(this), _value);
    //     IERC20(token).transfer(
    //         address(0x7605c0591Dc69a8C30BaB6b27511183e6617cFE1),
    //         _value
    //     );
    // }

    function transfer(address _to, uint256 _amount) external payable {
        IERC20(token).transferFrom(msg.sender, address(this), _amount);

        uint256 amountFee = (_amount * percentage) / 100;
        uint256 amountFinal = _amount - amountFee;

        IERC20(token).transfer(_to, amountFinal);
    }
}
