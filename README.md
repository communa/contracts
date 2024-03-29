# Communa - Smart Contracts
Communa is a web3 platform for freelancing that connects businesses with talented professionals worldwide, making remote work more convenient than ever before. 
- [https://communa.network/](https://communa.network/)
- [https://github.com/communa](https://github.com/communa)

Token address: https://polygonscan.com/address/0x11cb646503f17718B77A8CD5260061fadE305763#code

### Development
Clonning and running on a local machine
```bash
git clone git@github.com:communa/contracts.git
yarn install
yarn dev
```

### Testing
Running tests
```bash
npx hardhat test
npx hardhat test test/CommunaToken.ts --grep 'should transfer ownership'
```

# Deployment
To try out Etherscan verification, you first need to deploy a contract to an Ethereum network that's supported by Etherscan, such as Goerli or Polygon.

In this project, copy the .env.example file to a file named .env, and then edit it to fill in the details. Enter your Etherscan API key, your Ropsten node URL (eg from Alchemy), and the private key of the account which will send the deployment transaction. With a valid .env file in place, first deploy your contract:

Goerli
```shell
npx hardhat run --network goerli scripts/deployToken.ts
npx hardhat run --network goerli scripts/deployRouter.ts
npx hardhat run --network goerli scripts/pay.ts
npx hardhat run --network goerli scripts/mint.ts
npx hardhat run --network goerli scripts/airdrop.ts
```

Polygon
```shell
npx hardhat run --network polygon scripts/deployToken.ts
npx hardhat run --network polygon scripts/deployRouter.ts
npx hardhat run --network polygon scripts/pay.ts
npx hardhat run --network polygon scripts/mint.ts
npx hardhat run --network polygon scripts/airdrop.ts
```

Then, copy the deployment address and paste it in to replace `ROUTER_ADDRESS` and `TOKEN_ADDRESS` in this command:

Goerli
```shell
npx hardhat verify --network goerli TOKEN_ADDRESS
npx hardhat verify --network goerli ROUTER_ADDRESS TOKEN_ADDRESS
```

Polygon
```shell
npx hardhat verify --network polygon TOKEN_ADDRESS
npx hardhat verify --network polygon ROUTER_ADDRESS TOKEN_ADDRESS
```

# Commands
```shell
npx hardhat run --network goerli scripts/pay.ts
npx hardhat run --network goerli scripts/mint.ts
npx hardhat run --network goerli scripts/airdrop.ts
```

# Performance optimizations

For faster runs of your tests and scripts, consider skipping ts-node's type checking by setting the environment variable `TS_NODE_TRANSPILE_ONLY` to `1` in hardhat's environment. For more details see [the documentation](https://hardhat.org/guides/typescript.html#performance-optimizations).


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