import { BigInt } from "@graphprotocol/graph-ts";
import { User, DTokenUserBalance, LTokenUserBalance } from "../../../generated/schema"

export function findOrCreateUser(id: string): User {
  let user = User.load(id);

  if (!user) {
    user = new User(id);
    user.save();
    user.isCouncil = false;
    user.isCollateralServiceProvider = false;
  }

  return user as User;
}

export function findOrCreateDTokenUserBalance(
  user: string,
  dToken: string,
  timestamp: BigInt
): DTokenUserBalance {
  let dTokenUserBalance = DTokenUserBalance.load(user + dToken);

  if (!dTokenUserBalance) {
    dTokenUserBalance = new DTokenUserBalance(user + dToken);
    dTokenUserBalance.balance = BigInt.fromString('0');
    dTokenUserBalance.user = user;
    dTokenUserBalance.dToken = dToken;
    dTokenUserBalance.lastUpdatedTimestamp = timestamp.toI32();
    dTokenUserBalance.save();
  }

  return dTokenUserBalance as DTokenUserBalance
}

export function findOrCreateLTokenUserBalance(
  user: string,
  lToken: string,
  timestamp: BigInt
): LTokenUserBalance {
  let lTokenUserBalcne = LTokenUserBalance.load(user + lToken);

  if (!lTokenUserBalcne) {
    lTokenUserBalcne = new LTokenUserBalance(user + lToken);
    lTokenUserBalcne.balance = BigInt.fromString('0');
    lTokenUserBalcne.user = user;
    lTokenUserBalcne.lToken = lToken;
    lTokenUserBalcne.lastUpdatedTimestamp = timestamp.toI32();
    lTokenUserBalcne.save();
  }

  return lTokenUserBalcne as LTokenUserBalance
}
