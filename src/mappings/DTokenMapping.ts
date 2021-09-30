import { 
  Mint as MintEvent,
  Burn as BurnEvent, 
} from '../../generated/templates/DToken/DToken';
import {
  findOrCreateDTokenUserBalance,
} from './utils/initializers';

export function handleMint(event: MintEvent): void {
  let dTokenUserBalance = findOrCreateDTokenUserBalance(
    event.params.account.toHex(),
    event.address.toHex(),
    event.block.timestamp
  );

  dTokenUserBalance.balance = dTokenUserBalance.balance.plus(event.params.amount);
  dTokenUserBalance.lastUpdatedTimestamp = event.block.timestamp.toI32();

  dTokenUserBalance.save();
}

export function handleBurn(event: BurnEvent): void {
  let dTokenUserBalance = findOrCreateDTokenUserBalance(
    event.params.account.toHex(),
    event.address.toHex(),
    event.block.timestamp
  );

  dTokenUserBalance.balance = dTokenUserBalance.balance.minus(event.params.amount);
  dTokenUserBalance.lastUpdatedTimestamp = event.block.timestamp.toI32();

  dTokenUserBalance.save();
}