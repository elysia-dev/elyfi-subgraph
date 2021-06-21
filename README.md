# elyfi-subgraph

The code of Elyfi v2 subgraph

## Local Setup

We use docker compose for developoing the subgraph.
Our docker-compose file includes basic containers like graph node, ifps and postgresql and we added one more container(ganache-cli) for convenien

- `docker-compose up -d`
- Deploy local contracts with elyfi : In elyfi contracts repo, `yarn deploy --network ganache`
- Make .env file from local contract addresses : MONEYPOOL, LTOKEN, DTOKEN
- `yarn prepare`
- `yarn create-local`
- `yarn deploy-local`
