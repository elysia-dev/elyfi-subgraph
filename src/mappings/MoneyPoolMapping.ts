import { BigInt } from '@graphprotocol/graph-ts';
import {
  NewReserve,
  Deposit as DepositEvent,
  Borrow as BorrowEvent,
  Withdraw as WithdrawEvent,
  Repay as RepayEvent
} from '../../generated/Moneypool/MoneyPool';
import {
  Reserve,
  Deposit,
  Borrow,
  Withdraw,
  AssetBondToken,
  Repay,
  LToken,
  DToken
} from '../../generated/schema';
import {
  findOrCreateUser
} from './utils/initializers';

export function handleNewReserve(event: NewReserve): void {
  let reserve = new Reserve(event.params.asset.toHex());
  reserve.lTokenInterestIndex = BigInt.fromString('1' + '0'.repeat(27));
  reserve.isPaused = false;
  reserve.isActivated = true;
  reserve.lastUpdateTimestamp = event.block.timestamp.toI32();
  reserve.save();

  let lToken = new LToken(event.params.lToken.toHex());
  lToken.reserve = reserve.id;
  lToken.save();

  let dToken = new DToken(event.params.dToken.toHex());
  dToken.reserve = reserve.id;
  dToken.save();
}

export function handleDeposit(event: DepositEvent): void {
  let user = findOrCreateUser(event.params.account.toHex());
  let deposit = new Deposit(event.transaction.hash.toHex());
  let reserve = Reserve.load(event.params.asset.toHex());

  deposit.account = user.id;
  deposit.reserve = reserve.id;
  deposit.amount = event.params.amount;

  deposit.save();
}

export function handleWithdraw(event: WithdrawEvent): void {
  let user = findOrCreateUser(event.params.account.toHex());
  let withdraw = new Withdraw(event.transaction.hash.toHex());
  let reserve = Reserve.load(event.params.asset.toHex());

  withdraw.account = user.id;
  withdraw.reserve = reserve.id;
  withdraw.amount = event.params.amount;

  withdraw.save();
}

export function handleBorrow(event: BorrowEvent): void {
  let borrower = findOrCreateUser(event.params.borrower.toHex());
  let collateralServiceProvider = findOrCreateUser(event.params.collateralServiceProvider.toHex());
  let reserve = Reserve.load(event.params.asset.toHex());
  let borrow = new Borrow(event.transaction.hash.toHex());
  let token = AssetBondToken.load(event.params.tokenId.toString());

  borrow.borrower = borrower.id;
  borrow.collateralServiceProvider = collateralServiceProvider.id;
  borrow.amount = event.params.borrowAmount;
  borrow.borrowAPY = event.params.borrowAPY;
  borrow.reserve = reserve.id;
  borrow.tokenId = token.id;

  borrow.save();
}

export function handleRepay(event: RepayEvent): void {
  let borrower = findOrCreateUser(event.params.borrower.toHex());
  let reserve = Reserve.load(event.params.asset.toHex());
  let repay = new Repay(event.transaction.hash.toHex());
  let token = AssetBondToken.load(event.params.tokenId.toString());

  repay.borrower = borrower.id;
  repay.userDTokenBalance = event.params.userDTokenBalance;
  repay.feeOnCollateralServiceProvider = event.params.feeOnCollateralServiceProvider;
  repay.reserve = reserve.id;
  repay.tokenId = token.id;

  repay.save()
}
