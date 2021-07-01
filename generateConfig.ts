import * as fs from "fs";

interface DeployedContract {
  address: string
}

const network = process.env.NETWORK || 'mainnet'
const kovanStartBlock = '25834770'
const ethStartBlock = '12689173'

const main = async () => {
  let templateData = await fs.promises.readFile('./subgraph.template.yaml', 'utf8');

  await Promise.all([
    'MoneyPool', 'LToken', 'DToken', 'Tokenizer', 'Connector'
  ].map(async (key) => {
    const file = await fs.promises.readFile(`./lib/elyfi/deployments/${network}/${key}.json`, 'utf8')
    const data = JSON.parse(file) as DeployedContract;
    templateData = templateData.replace(new RegExp(`{ ${key} }`, "g"), data.address)
  }))

  templateData = templateData.replace(new RegExp(`{ Network }`, "g"), network === 'ganache' ? 'mainnet' : 'mainnet')
  templateData = templateData.replace(new RegExp(`{ StartBlock }`, "g"),
    network === 'ganache' ? '1' : network === 'kovan' ? kovanStartBlock : ethStartBlock
  )

  await fs.promises.writeFile('./subgraph.yaml', templateData, 'utf8');
}

main();