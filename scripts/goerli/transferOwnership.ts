import {ethers} from "hardhat";

const contract = require("../../artifacts/contracts/CommunaToken.sol/CommunaToken.json");

const GOERLI_API_KEY = process.env.GOERLI_API_KEY as string;
const PRIVATE_KEY = process.env.PRIVATE_KEY as string;
const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS as string;
const MULTISIG_ADDRESS = process.env.MULTISIG_ADDRESS as string;

async function main() {
  const provider = new ethers.providers.AlchemyProvider(
    "goerli",
    GOERLI_API_KEY
  );
  const signer = new ethers.Wallet(PRIVATE_KEY, provider);
  const token = new ethers.Contract(TOKEN_ADDRESS, contract.abi, signer);

  await token.transferOwnership(MULTISIG_ADDRESS);

  const ownerNew = await token.owner();

  console.log(ownerNew);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
