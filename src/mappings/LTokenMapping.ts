import {
  LTokenBurn,
  LTokenMint
} from '../../generated/schema';
import { 
  Transfer as TransferEvent,
  Mint as MintEvent,
  Burn as BurnEvent,
 } from '../../generated/templates/LToken/LToken';
import {
  findOrCreateLTokenUserBalance,
} from './utils/initializers';

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

export function handleMint(event: MintEvent): void {
  let mint = new LTokenMint(event.transaction.hash.toHex());

  mint.account = event.params.account.toHex();
  mint.lToken = event.address.toHex();
  mint.amount = event.params.amount;
  mint.index = event.params.index;
  mint.timestamp = event.block.timestamp.toI32();

  mint.save();
}

export function handleBurn(event: BurnEvent): void {
  let burn = new LTokenBurn(event.transaction.hash.toHex());

  burn.account = event.params.account.toHex();
  burn.receiver = event.params.underlyingAssetReceiver.toHex();
  burn.lToken = event.address.toHex();
  burn.amount = event.params.amount;
  burn.index = event.params.index;
  burn.timestamp = event.block.timestamp.toI32();

  burn.save();
}