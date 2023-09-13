# Used solidity contracts
* https://github.com/amanusk/hardhat-template
* https://github.com/PaulRBerg/hardhat-template
* https://github.com/smartcontractkit/hardhat-starter-kit
* 
* https://github.com/PatrickAlphaC/hardhat-dao-fcc
* https://github.com/PatrickAlphaC/dao-template
* https://github.com/PatrickAlphaC/hardhat-simple-storage-fcc

# Advanced Sample Hardhat Project

This project demonstrates an advanced Hardhat use case, integrating other tools commonly used alongside Hardhat in the ecosystem.

The project comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts. It also comes with a variety of other tools, preconfigured to work with the project code.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
REPORT_GAS=true npx hardhat test
npx hardhat coverage
npx hardhat run scripts/deploy.ts
TS_NODE_FILES=true npx ts-node scripts/deploy.ts
npx eslint '**/*.{js,ts}'
npx eslint '**/*.{js,ts}' --fix
npx prettier '**/*.{json,sol,md}' --check
npx prettier '**/*.{json,sol,md}' --write
npx solhint 'contracts/**/*.sol'
npx solhint 'contracts/**/*.sol' --fix
```

# Etherscan verification

To try out Etherscan verification, you first need to deploy a contract to an Ethereum network that's supported by Etherscan, such as Ropsten.

In this project, copy the .env.example file to a file named .env, and then edit it to fill in the details. Enter your Etherscan API key, your Ropsten node URL (eg from Alchemy), and the private key of the account which will send the deployment transaction. With a valid .env file in place, first deploy your contract:

```shell
npx hardhat run --network goerli scripts/deployToken.ts
npx hardhat run --network goerli scripts/deployRouter.ts
npx hardhat run --network goerli scripts/pay.ts
npx hardhat run --network goerli scripts/mint.ts
```

Then, copy the deployment address and paste it in to replace `ROUTER_ADDRESS` and `TOKEN_ADDRESS` in this command:

```shell
npx hardhat verify --network goerli ROUTER_ADDRESS TOKEN_ADDRESS
npx hardhat verify --network goerli 0x4b98Be595D0a5D8d5F74bE9Ac26FD7753C3fa035 "0x009fd1a3BE53F53beA7D5E67080558BB35843B30"
```

# Performance optimizations

For faster runs of your tests and scripts, consider skipping ts-node's type checking by setting the environment variable `TS_NODE_TRANSPILE_ONLY` to `1` in hardhat's environment. For more details see [the documentation](https://hardhat.org/guides/typescript.html#performance-optimizations).
