import {
  Transfer as TransferEvent,
} from '../../generated/LToken/LToken';
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