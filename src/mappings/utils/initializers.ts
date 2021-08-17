import { BigInt } from "@graphprotocol/graph-ts";
import { User, DTokenUserBalance, LTokenUserBalance, Reserve, LToken, DToken, StakingPool } from "../../../generated/schema"

export function findOrCreateUser(id: string): User {
  let user = User.load(id);

  if (!user) {
    user = new User(id);
    user.isCouncil = false;
    user.isCollateralServiceProvider = false;
    user.save();
  }

  return user as User;
}

export function findOrCreateStakingPool(id: string): StakingPool {
  let stakingPool = StakingPool.load(id);

  if (!stakingPool) {
    stakingPool = new StakingPool(id);
    stakingPool.save();
  }

  return stakingPool as StakingPool;
}

export function findOrCreateDTokenUserBalance(
  user: string,
  dTokenAddress: string,
  timestamp: BigInt
): DTokenUserBalance {
  let dTokenUserBalance = DTokenUserBalance.load(user + dTokenAddress);
  let dToken = DToken.load(dTokenAddress);
  let reserve = Reserve.load(dToken.reserve);

  if (!dTokenUserBalance) {
    reserve.dTokenUserBalanceCount = reserve.dTokenUserBalanceCount + 1;
    reserve.save();
  }

  if (!dTokenUserBalance) {
    dTokenUserBalance = new DTokenUserBalance(user + dTokenAddress);
    dTokenUserBalance.balance = BigInt.fromString('0');
    dTokenUserBalance.user = user;
    dTokenUserBalance.dToken = dTokenAddress;
    dTokenUserBalance.lastUpdatedTimestamp = timestamp.toI32();
    dTokenUserBalance.reserve = reserve.id;
    dTokenUserBalance.save();
  }

  return dTokenUserBalance as DTokenUserBalance
}

export function findOrCreateLTokenUserBalance(
  user: string,
  lTokenAddrees: string,
  timestamp: BigInt
): LTokenUserBalance {
  let lTokenUserBalance = LTokenUserBalance.load(user + lTokenAddrees);
  let lToken = LToken.load(lTokenAddrees);
  let reserve = Reserve.load(lToken.reserve);

  if (!lTokenUserBalance) {
    reserve.lTokenUserBalanceCount = reserve.lTokenUserBalanceCount + 1;
    reserve.save();
  }

  if (!lTokenUserBalance) {
    lTokenUserBalance = new LTokenUserBalance(user + lTokenAddrees);
    lTokenUserBalance.balance = BigInt.fromString('0');
    lTokenUserBalance.user = user;
    lTokenUserBalance.lToken = lTokenAddrees;
    lTokenUserBalance.lastUpdatedTimestamp = timestamp.toI32();
    lTokenUserBalance.reserve = reserve.id;
    lTokenUserBalance.save();
  }

  return lTokenUserBalance as LTokenUserBalance
}