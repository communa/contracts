import { ethers } from "hardhat";

const COMMUNA_ADDRESS = process.env.COMMUNA_ADDRESS as string;

async function main() {
  const CommunaRouter = await ethers.getContractFactory("CommunaRouter");
  const router = await CommunaRouter.deploy(COMMUNA_ADDRESS);

  await router.deployed();

  console.log("CommunaRouter deployed to:", router.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
