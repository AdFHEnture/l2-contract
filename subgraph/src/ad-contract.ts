import { AdCreated as AdCreatedEvent } from "../generated/AdContract/AdContract"
import { AdCreated } from "../generated/schema"

export function handleAdCreated(event: AdCreatedEvent): void {
  let entity = new AdCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.adId = event.params.adId
  entity.advertiser = event.params.advertiser
  entity.adTitle = event.params.adTitle
  entity.expiresAt = event.params.expiresAt
  entity.budget = event.params.budget

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
