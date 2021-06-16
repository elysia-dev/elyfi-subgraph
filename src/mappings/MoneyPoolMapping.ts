import { BigInt } from '@graphprotocol/graph-ts';
import { NewReserve } from '../../generated/Moneypool/MoneyPool';
import { Reserve } from '../../generated/schema';

export function handleNewReserve(event: NewReserve): void {
  let reserve = new Reserve(event.params.asset.toHex());
  reserve.lTokenInterestIndex = BigInt.fromString('1' + '0'.repeat(27));
  reserve.isPaused = false;
  reserve.isActivated = true;
  reserve.lastUpdateTimestamp = event.block.timestamp.toI32();
  reserve.save();
}