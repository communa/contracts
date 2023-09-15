import { ethers } from "hardhat";

const contract = require("../artifacts/contracts/CommunaToken.sol/CommunaToken.json");

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY as string;
const PRIVATE_KEY = process.env.PRIVATE_KEY as string;
const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS as string;
const CLIENT_ADDRESS = process.env.CLIENT_ADDRESS as string;

async function main() {
  const provider = new ethers.providers.AlchemyProvider(
    "goerli",
    ALCHEMY_API_KEY
  );
  const signer = new ethers.Wallet(PRIVATE_KEY, provider);
  const token = new ethers.Contract(TOKEN_ADDRESS, contract.abi, signer);

  const amount = ethers.utils.parseEther("1000");

  const mint = await token.mint(CLIENT_ADDRESS, amount);

  console.log(mint);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
