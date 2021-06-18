import {
  Mint as MintEvent,
  Burn as BurnEvent,
  Transfer as TransferEvent,
} from '../../generated/LToken/LToken';
import {
  findOrCreateLTokenUserBalance,
} from './utils/initializers';

export function handleMint(event: MintEvent): void {
  let lTokenUserBalance = findOrCreateLTokenUserBalance(
    event.params.account.toHex(),
    event.address.toHex(),
    event.block.timestamp
  );

  lTokenUserBalance.balance = lTokenUserBalance.balance.plus(event.params.amount);
  lTokenUserBalance.lastUpdatedTimestamp = event.block.timestamp.toI32();

  lTokenUserBalance.save();
}

export function handleBurn(event: BurnEvent): void {
  let lTokenUserBalance = findOrCreateLTokenUserBalance(
    event.params.account.toHex(),
    event.address.toHex(),
    event.block.timestamp
  );

  lTokenUserBalance.balance = lTokenUserBalance.balance.minus(event.params.amount);
  lTokenUserBalance.lastUpdatedTimestamp = event.block.timestamp.toI32();

  lTokenUserBalance.save();
}

export function handleTransfer(event: TransferEvent): void {
  let lTokenFromUserBalance = findOrCreateLTokenUserBalance(
    event.params.from.toHex(),
    event.address.toHex(),
    event.block.timestamp
  );

  let lTokenToUserBalance = findOrCreateLTokenUserBalance(
    event.params.to.toHex(),
    event.address.toHex(),
    event.block.timestamp
  );

  lTokenFromUserBalance.balance = lTokenFromUserBalance.balance.minus(event.params.value);
  lTokenFromUserBalance.lastUpdatedTimestamp = event.block.timestamp.toI32();
  lTokenFromUserBalance.save();

  lTokenToUserBalance.balance = lTokenToUserBalance.balance.plus(event.params.value);
  lTokenToUserBalance.lastUpdatedTimestamp = event.block.timestamp.toI32();
  lTokenToUserBalance.save();
}