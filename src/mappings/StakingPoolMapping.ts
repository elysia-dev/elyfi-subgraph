import {
  Stake,
  Migrate,
  Withdraw,
  Claim,
} from '../../generated/ELStakingPool/StakingPool'
import {
  findOrCreateStakingPool,
  findOrCreateUser
} from './utils/initializers';
import { StakingPoolClaim, StakingPoolMigrate, StakingPoolStake, StakingPoolStaker, StakingPoolWithdraw, } from "../../generated/schema";
import { BigInt } from '@graphprotocol/graph-ts'

export function handleStake(event: Stake): void {
  let user = findOrCreateUser(event.params.user.toHex());
  let stakingPool = findOrCreateStakingPool(event.address.toHex());

  let staker = StakingPoolStaker.load(BigInt.fromI32(event.params.currentRound).toString() + user.id + stakingPool.id);

  if (!staker) {
    staker = new StakingPoolStaker(BigInt.fromI32(event.params.currentRound).toString() + user.id + stakingPool.id);
    staker.stakingPool = stakingPool.id;
    staker.user = user.id;
    staker.round = event.params.currentRound;
  }

  staker.amount = event.params.userPrincipal;
  staker.save();

  let stakingPoolStake = new StakingPoolStake(event.transaction.hash.toHex());
  stakingPoolStake.user = user.id;
  stakingPoolStake.stakingPool = stakingPool.id;
  stakingPoolStake.amount = event.params.amount;
  stakingPoolStake.round = event.params.currentRound;
  stakingPoolStake.timestamp = event.block.timestamp.toI32();

  stakingPoolStake.save();
}

export function handleWithdraw(event: Withdraw): void {
  let user = findOrCreateUser(event.params.user.toHex());
  let stakingPool = findOrCreateStakingPool(event.address.toHex());

  let stakingPoolWithdraw = new StakingPoolWithdraw(event.transaction.hash.toHex());
  stakingPoolWithdraw.user = user.id;
  stakingPoolWithdraw.stakingPool = stakingPool.id;
  stakingPoolWithdraw.amount = event.params.amount;
  stakingPoolWithdraw.round = event.params.currentRound;
  stakingPoolWithdraw.timestamp = event.block.timestamp.toI32();

  stakingPoolWithdraw.save();
}

export function handleMigrate(event: Migrate): void {
  let user = findOrCreateUser(event.params.user.toHex());
  let stakingPool = findOrCreateStakingPool(event.address.toHex());

  let stakingPoolMigrate = new StakingPoolMigrate(event.transaction.hash.toHex());
  stakingPoolMigrate.user = user.id;
  stakingPoolMigrate.stakingPool = stakingPool.id;
  stakingPoolMigrate.amount = event.params.amount;
  stakingPoolMigrate.round = event.params.currentRound;
  stakingPoolMigrate.timestamp = event.block.timestamp.toI32();

  stakingPoolMigrate.save();
}

export function handleClaim(event: Claim): void {
  let user = findOrCreateUser(event.params.user.toHex());
  let stakingPool = findOrCreateStakingPool(event.address.toHex());

  let stakingPoolClaim = new StakingPoolClaim(event.transaction.hash.toHex());
  stakingPoolClaim.user = user.id;
  stakingPoolClaim.stakingPool = stakingPool.id;
  stakingPoolClaim.amount = event.params.reward;
  stakingPoolClaim.round = event.params.currentRound;
  stakingPoolClaim.timestamp = event.block.timestamp.toI32();

  stakingPoolClaim.save();
}