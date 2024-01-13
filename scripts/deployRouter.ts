import {ethers} from "hardhat";

const MULTISIG_ADDRESS = process.env.MULTISIG_ADDRESS as string;

async function main() {
  const CommunaRouter = await ethers.getContractFactory("CommunaRouter");
  const router = await CommunaRouter.deploy(MULTISIG_ADDRESS);

  await router.deployed();

  console.log("CommunaRouter deployed to:", router.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
