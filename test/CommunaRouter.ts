import {expect} from "chai";
import {ethers} from "hardhat";

describe("CommunaRouter", function () {
  it("should pay", async function () {
    // Arrange
    const [addr1, addr2, addr3] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("CommunaToken");
    const token = await Token.deploy();
    await token.deployed();

    const Router = await ethers.getContractFactory("CommunaRouter");
    const router = await Router.deploy(addr3.address);
    await router.deployed();

    token.mint(addr1.address, 100);

    // Act
    await token.approve(router.address, 100, {from: addr1.address});
    await router.pay(addr2.address, token.address, 100, {
      from: addr1.address,
    });

    // Assert
    const totalAddr1 = await token.balanceOf(addr1.address);
    const totalAddr2 = await token.balanceOf(addr2.address);
    const totalAddr3 = await token.balanceOf(addr3.address);

    expect(totalAddr1).to.eq("0");
    expect(totalAddr2).to.eq("95");
    expect(totalAddr3).to.eq("5");
  });

  it("should transfer ownership", async () => {
    // Arrange
    const [addr1, addr2, addr3] = await ethers.getSigners();
    const Router = await ethers.getContractFactory("CommunaRouter");
    const router = await Router.deploy(addr3.address);
    await router.deployed();

    // Act
    const before = await router.owner();
    await router.transferOwnership(addr2.address);
    const after = await router.owner();

    // Assert
    expect(before).to.eq(addr1.address);
    expect(after).to.eq(addr2.address);
    expect(before).not.to.eq(after);
  });
});
