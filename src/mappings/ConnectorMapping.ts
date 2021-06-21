import {
  CollateralServiceProviderRevoked,
  CouncilRevoked,
  NewCollateralServiceProviderAdded,
  NewCouncilAdded,
} from '../../generated/Connector/Connector'
import {
  findOrCreateUser
} from './utils/initializers';

export function handleCollateralServiceProviderRevoked(event: CollateralServiceProviderRevoked): void {
  let user = findOrCreateUser(event.params.account.toHex());
  user.isCollateralServiceProvider = false;
  user.save();
}

export function handleCouncilRevoked(event: CouncilRevoked): void {
  let user = findOrCreateUser(event.params.account.toHex());
  user.isCouncil = false;
  user.save();
}

export function handleNewCollateralServiceProviderAdded(event: NewCollateralServiceProviderAdded): void {
  let user = findOrCreateUser(event.params.account.toHex());
  user.isCollateralServiceProvider = true;
  user.save();
}

export function handleNewCouncilAdded(event: NewCouncilAdded): void {
  let user = findOrCreateUser(event.params.account.toHex());
  user.isCouncil = true;
  user.save();
}