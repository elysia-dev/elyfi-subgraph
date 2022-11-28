# elyfi-subgraph

The code of Elyfi subgraph. You can test mainnet subgraph [here](https://thegraph.com/explorer/subgraph?id=0x9d2d46e67c420147834c76b23c9bac485f114feb-0)

##
```sh
yarn global add @graphprotocol/graph-cli
```

## Local Setup

We use docker compose for developoing the subgraph.
Our docker-compose file includes basic containers like graph node, ifps and postgresql and we add one more container(ganache-cli) for convenience

- `docker-compose up -d`
- `yarn deploy-contracts:local` : Deploy elyfi contrats to ganache
- `yarn prepare:local` : Generate subgraph.yaml
- `yarn codegen`
- `yarn create:local`
- `yarn deploy:local`

For test transaction data,

- `yarn task createDeposit --network ganache`
- `yarn task createWithdraw --newtork ganache`


## Create reserve on local
> `HTTP error creating the subgraph: ECONNREFUSED` raised then remove data dictory
- `docker-compose up -d`
- `yarn deploy:core --network ganache` on `lib/elyfi` project
- `yarn deploy:reserve --network ganache --tags dai_reserve` on `lib/elyfi` project
- `yarn prepare:local` : Generate subgraph.yaml
- `yarn codegen`
- `yarn create:local`
- `yarn deploy:local`

## How to deploy (production)

1. `graph auth --studio ACCESS_KEY`. You can find the ACCESS_KEY in https://thegraph.com/studio/subgraph/elyfi/
2. `graph codegen && graph build`
3. `graph deploy --studio elyfi` with new version