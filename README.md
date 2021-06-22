# elyfi-subgraph

The code of Elyfi v2 subgraph

## Local Setup

We use docker compose for developoing the subgraph.
Our docker-compose file includes basic containers like graph node, ifps and postgresql and we add one more container(ganache-cli) for convenience

- `docker-compose up -d`
- `yarn deploy-contracts`
- Make .env file from local contract addresses : MONEYPOOL, LTOKEN, DTOKEN
- `yarn subgraphgen`
- `yarn codegen`
- `yarn create-local`
- `yarn deploy-local`

For test transaction data,

- `yarn task createDeposit --network ganache`
- `yarn task createWithdraw --newtork ganaceh`
