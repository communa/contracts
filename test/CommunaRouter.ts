import { expect } from "chai";
import { ethers } from "hardhat";

describe("Router", function () {
  it("should pay", async function () {
    const [addr1, addr2, addr3] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("CommunaToken");
    const token = await Token.deploy();
    await token.deployed();

    const Router = await ethers.getContractFactory("CommunaRouter");
    const router = await Router.deploy(addr3.address);
    await router.deployed();

    token.mint(addr1.address, 100);

    await token.approve(router.address, 100, { from: addr1.address });
    await router.pay(addr2.address, token.address, 100, {
      from: addr1.address,
    });

    const totalAddr1 = await token.balanceOf(addr1.address);
    const totalAddr2 = await token.balanceOf(addr2.address);
    const totalAddr3 = await token.balanceOf(addr3.address);

    // console.log(addr1.address, totalAddr1);
    // console.log(addr2.address, totalAddr2);
    // console.log(addr3.address, totalAddr3);

    expect(totalAddr1).to.eq("0");
    expect(totalAddr2).to.eq("95");
    expect(totalAddr3).to.eq("5");
  });
});
