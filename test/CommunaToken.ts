import { expect } from "chai";
import { ethers } from "hardhat";
import snapshotGasCost from "@uniswap/snapshot-gas-cost";

describe("CommunaToken", function () {
  it("should delpoy with zero supply", async () => {
    // Arrange
    const Token = await ethers.getContractFactory("CommunaToken");
    const token = await Token.deploy();

    // Act
    const totalSupply = ethers.utils.parseEther("0");
    await token.deployed();

    // Assert
    expect(await token.totalSupply()).to.eq(totalSupply);
  });

  it("should mint token", async () => {
    // Arrange
    const [addr1] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("CommunaToken");
    const token = await Token.deploy();
    await token.deployed();

    // Act
    const toMint = ethers.utils.parseEther("1");
    await token.mint(addr1.address, toMint);

    // Assert
    expect(await token.totalSupply()).to.eq(toMint);
  });

  it("should transfer tokens between accounts", async () => {
    // Arrange
    const [addr1, addr2] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("CommunaToken");
    const token = await Token.deploy();
    await token.deployed();

    const toMint = ethers.utils.parseEther("1");
    const toSend = ethers.utils.parseEther("0.4");
    const toReceive = ethers.utils.parseEther("0.6");

    // Act
    await token.mint(addr1.address, toMint);
    await token.transfer(addr2.address, toSend, {
      from: addr1.address,
    });

    // Assert
    expect(await token.balanceOf(addr1.address)).to.eq(toReceive);
    expect(await token.balanceOf(addr2.address)).to.eq(toSend);
  });

  it("should fail to transfer with low balance", async () => {
    // Arrange
    const [addr1, addr2] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("CommunaToken");
    const token = await Token.deploy();
    await token.deployed();

    // Act
    const toMint = ethers.utils.parseEther("1");
    const toSend = ethers.utils.parseEther("1.1");

    await token.mint(addr1.address, toMint);

    // Assert
    expect(await token.balanceOf(addr1.address)).to.eq(toMint);

    await expect(token.transfer(addr2.address, toSend)).to.be.revertedWith(
      "ERC20: transfer amount exceeds balance"
    );
  });

  it("should airdrop", async () => {
    // Arrange
    const [addr1] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("CommunaToken");
    const token = await Token.deploy();
    await token.deployed();

    // Act
    const toReceive = ethers.utils.parseEther("10");

    await token.airdrop();

    // Assert
    expect(await token.balanceOf(addr1.address)).to.eq(toReceive);
  });

  it("test gas cost of transfer", async () => {
    // Arrange
    const [addr1, addr2] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("CommunaToken");
    const token = await Token.deploy();
    await token.deployed();

    // Act
    const toMint = ethers.utils.parseEther("1");
    const toSend = ethers.utils.parseEther("0.4");

    await token.mint(addr1.address, toMint);

    expect(await token.balanceOf(addr1.address)).to.eq(toMint);

    await snapshotGasCost(token.transfer(addr2.address, toSend));
  });
});
