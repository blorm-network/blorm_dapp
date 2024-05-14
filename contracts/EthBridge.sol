// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract EthBridge {
    address public admin;
    IERC20 public token;
    
    event TokensLocked(address indexed user, uint256 amount, string cosmosAddress);
    event TokensUnlocked(address indexed user, uint256 amount);

    constructor(address _token) {
        admin = msg.sender;
        token = IERC20(_token);
    }

    function lockTokens(uint256 amount, string memory cosmosAddress) external {
        require(token.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        emit TokensLocked(msg.sender, amount, cosmosAddress);
    }

    function unlockTokens(address user, uint256 amount) external {
        require(msg.sender == admin, "Only admin can unlock tokens");
        require(token.transfer(user, amount), "Transfer failed");
        emit TokensUnlocked(user, amount);
    }
}
