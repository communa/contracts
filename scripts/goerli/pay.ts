import {ethers} from "hardhat";

const contractRouterAbi = require("../../artifacts/contracts/CommunaRouter.sol/CommunaRouter.json");
const contractTokenAbi = require("../../artifacts/contracts/CommunaToken.sol/CommunaToken.json");

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY as string;
const PRIVATE_KEY = process.env.PRIVATE_KEY as string;

const ROUTER_ADDRESS = process.env.ROUTER_ADDRESS as string;
const FREELANCER_ADDRESS = process.env.FREELANCER_ADDRESS as string;
const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS as string;

async function main() {
  const provider = new ethers.providers.AlchemyProvider(
    "goerli",
    ALCHEMY_API_KEY
  );
  const signer = new ethers.Wallet(PRIVATE_KEY, provider);
  const token = new ethers.Contract(
    TOKEN_ADDRESS,
    contractTokenAbi.abi,
    signer
  );
  const router = new ethers.Contract(
    ROUTER_ADDRESS,
    contractRouterAbi.abi,
    signer
  );
  const amount = ethers.utils.parseEther("1");

  const approve = await token.approve(ROUTER_ADDRESS, amount, {
    gasLimit: 600000,
  });
  const transfer = await router.transfer(
    TOKEN_ADDRESS,
    FREELANCER_ADDRESS,
    amount,
    {
      gasLimit: 600000,
    }
  );

  console.log(approve);
  console.log(transfer);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
