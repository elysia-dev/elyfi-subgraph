import {
  EmptyAssetBondMinted,
  AssetBondCollateralized,
  AssetBondLiquidated,
  AssetBondReleased,
  AssetBondSettled,
  AssetBondSigned
} from '../../generated/Tokenizer/Tokenizer'
import {
  AssetBondToken
} from '../../generated/schema';
import {
  findOrCreateUser
} from './utils/initializers';

enum AssetBondTokenState {
  EMPTY,
  SETTLED,
  CONFIRMED,
  COLLATERALIZED,
  DELINQUENT,
  REDEEMED,
  LIQUIDATED,
}

export function handleEmptyAssetBondMinted(event: EmptyAssetBondMinted): void {
  let assetBondToken = new AssetBondToken(event.params.tokenId.toString())
  let collateralServiceProvider = findOrCreateUser(event.params.account.toHex());

  assetBondToken.collateralServiceProvider = collateralServiceProvider.id;
  assetBondToken.state = AssetBondTokenState.EMPTY;

  assetBondToken.save();
}

export function handleAssetBondCollateralized(event: AssetBondCollateralized): void {
  let assetBondToken = AssetBondToken.load(event.params.tokenId.toString())

  assetBondToken.state = AssetBondTokenState.COLLATERALIZED;
  assetBondToken.interestRate = event.params.interestRate;
  assetBondToken.collateralizeTimestamp = event.block.timestamp.toI32();

  assetBondToken.save();
}

export function handleAssetBondLiquidated(event: AssetBondLiquidated): void {
  let assetBondToken = AssetBondToken.load(event.params.tokenId.toString())
  assetBondToken.state = AssetBondTokenState.LIQUIDATED;

  assetBondToken.save();
}

export function handleAssetBondReleased(event: AssetBondReleased): void {
  let assetBondToken = AssetBondToken.load(event.params.tokenId.toString())
  assetBondToken.state = AssetBondTokenState.REDEEMED;

  assetBondToken.save();
}

export function handleAssetBondSettled(event: AssetBondSettled): void {
  let assetBondToken = AssetBondToken.load(event.params.tokenId.toString())
  let borrower = findOrCreateUser(event.params.borrower.toHex());
  let signer = findOrCreateUser(event.params.signer.toHex());

  assetBondToken.borrower = borrower.id;
  assetBondToken.signer = signer.id;
  assetBondToken.principal = event.params.principal;
  assetBondToken.couponRate = event.params.couponRate;
  assetBondToken.delinquencyRate = event.params.delinquencyRate;
  assetBondToken.debtCeiling = event.params.debtCeiling;
  assetBondToken.maturityTimestamp = event.params.maturityTimestamp.toI32();
  assetBondToken.liquidationTimestamp = event.params.maturityTimestamp.toI32();
  assetBondToken.ipfsHash = event.params.ifpsHash;
  assetBondToken.state = AssetBondTokenState.SETTLED;

  assetBondToken.save();
}

export function handleAssetBondSigned(event: AssetBondSigned): void {
  let assetBondToken = AssetBondToken.load(event.params.tokenId.toString())

  assetBondToken.state = AssetBondTokenState.CONFIRMED;
  assetBondToken.signerOpinionHash = event.params.signerOpinionHash;

  assetBondToken.save();
}
