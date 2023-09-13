import { ethers } from "hardhat";

async function main() {
  const CommunaToken = await ethers.getContractFactory("CommunaToken");
  const token = await CommunaToken.deploy();

  await token.deployed();

  console.log("CommunaToken deployed to:", token.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
