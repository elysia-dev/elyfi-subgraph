import * as fs from "fs";

interface DeployedContract {
  address: string
}

const main = async () => {
  let templateData = await fs.promises.readFile('./subgraph.template.yaml', 'utf8');

  await Promise.all([
    'MoneyPool', 'LToken', 'DToken', 'Tokenizer', 'Connector'
  ].map(async (key) => {
    const file = await fs.promises.readFile(`./lib/elyfi/deployments/ganache/${key}.json`, 'utf8')
    const data = JSON.parse(file) as DeployedContract;
    templateData = templateData.replace(new RegExp(`{${key}}`, "g"), data.address)
  }))

  await fs.promises.writeFile('./subgraph.yaml', templateData, 'utf8');
}

main();