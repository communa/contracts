// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

const contract = require("../artifacts/contracts/CommunaRouter.sol/CommunaRouter.json");

const INFURA_API_KEY = process.env.INFURA_API_KEY as string;
const PRIVATE_KEY = process.env.PRIVATE_KEY as string;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS as string;

async function main() {
  const provider = new ethers.providers.InfuraProvider(
    "goerli",
    INFURA_API_KEY
  );
  const signer = new ethers.Wallet(PRIVATE_KEY, provider);
  const c = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

  // https://polygonscan.com/token/0xc2132d05d31c914a87c6611c10748aeb04b58e8f
  const token = "0xc2132d05d31c914a87c6611c10748aeb04b58e8f";
  const freelancer = "0xc8e8089B28170CC447E89e9DaB898Bf0Cd6f53d8";
  const amount = 100;

  await c.pay(token, freelancer, amount);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
