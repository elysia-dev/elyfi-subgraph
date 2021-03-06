import * as fs from "fs";

interface DeployedContract {
  address: string
}

const network = process.env.NETWORK || 'mainnet'
const kovanStartBlock = '25834770'
const ethStartBlock = '12830628	'
const ropstenStartBlock = '11175520'

// mainnet staking pool
const elStakingPool = '0xd804e198d25a1920522ca0094a670184a9c972d7'
const elfiStakingPool = '0xb41bcd480fbd986331eeed516c52e447b50dacb4'
const elfiStakingPoolV2 = '0xcd668b44c7cf3b63722d5ce5f655de68dd8f2750'

const main = async () => {
  let templateData = await fs.promises.readFile('./subgraph.template.yaml', 'utf8');

  await Promise.all([
    'MoneyPool', 'Connector'
  ].map(async (key) => {
    const file = await fs.promises.readFile(`./lib/elyfi/deployments/${network}/${key}.json`, 'utf8')
    const data = JSON.parse(file) as DeployedContract;
    templateData = templateData.replace(new RegExp(`{ ${key} }`, "g"), data.address)
  }))

  templateData = templateData.replace(new RegExp(`{ Network }`, "g"), network === 'ganache' ? 'mainnet' : network)
  templateData = templateData.replace(new RegExp(`{ ELStakingPool }`, "g"), elStakingPool)
  templateData = templateData.replace(new RegExp(`{ ELFIStakingPool }`, "g"), elfiStakingPool)
  templateData = templateData.replace(new RegExp(`{ ELFIStakingPoolV2 }`, "g"), elfiStakingPoolV2)
  templateData = templateData.replace(new RegExp(`{ StartBlock }`, "g"),
    network === 'ganache' ? '1' : network === 'kovan' ? kovanStartBlock : network === 'ropsten' ? ropstenStartBlock : ethStartBlock
  )

  await fs.promises.writeFile('./subgraph.yaml', templateData, 'utf8');
}

main();