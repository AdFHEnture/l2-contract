import { AdCreated as AdCreatedEvent } from "../generated/AdContract/AdContract"
import { AdCreated, Advertiser } from "../generated/schema"
import { BigInt, Bytes } from "@graphprotocol/graph-ts";

export function handleAdCreated(event: AdCreatedEvent): void {
  let advertiserId = event.params.advertiser.toHex()
  let advertiser = Advertiser.load(Bytes.fromUTF8(advertiserId))

  if (advertiser == null) { 
    advertiser = new Advertiser(Bytes.fromUTF8(advertiserId))
    advertiser.wallet = event.params.advertiser
    advertiser.totalPaid = BigInt.fromI32(0)
    advertiser.interests = new Array<BigInt>(event.params.adVector.length).fill(BigInt.fromI32(0))
  } else {
    advertiser.totalPaid = BigInt.fromI32(0)
  }

  // Update interests
  let adVector = event.params.adVector
  let interests = advertiser.interests
  for (let i = 0; i < adVector.length; i++) {
    if (adVector[i]) {
      interests[i] = interests[i].plus(BigInt.fromI32(1))
    }
  }
  advertiser.interests = interests

  advertiser.save()

  // Create new AdCreated entity
  let ad = new AdCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )

  ad.adId = event.params.adId
  ad.advertiser = Bytes.fromUTF8(advertiserId)
  ad.websiteUrl = event.params.websiteUrl
  ad.imageUrl = event.params.imageUrl
  ad.expiresAt = event.params.expiresAt
  ad.adVector = event.params.adVector

  ad.blockNumber = event.block.number
  ad.blockTimestamp = event.block.timestamp
  ad.transactionHash = event.transaction.hash

  ad.save()
}
