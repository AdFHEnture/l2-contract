import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import { AdCreated } from "../generated/AdContract/AdContract"

export function createAdCreatedEvent(
  adId: BigInt,
  advertiser: Address,
  adTitle: string,
  expiresAt: BigInt,
  budget: BigInt
): AdCreated {
  let adCreatedEvent = changetype<AdCreated>(newMockEvent())

  adCreatedEvent.parameters = new Array()

  adCreatedEvent.parameters.push(
    new ethereum.EventParam("adId", ethereum.Value.fromUnsignedBigInt(adId))
  )
  adCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "advertiser",
      ethereum.Value.fromAddress(advertiser)
    )
  )
  adCreatedEvent.parameters.push(
    new ethereum.EventParam("adTitle", ethereum.Value.fromString(adTitle))
  )
  adCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "expiresAt",
      ethereum.Value.fromUnsignedBigInt(expiresAt)
    )
  )
  adCreatedEvent.parameters.push(
    new ethereum.EventParam("budget", ethereum.Value.fromUnsignedBigInt(budget))
  )

  return adCreatedEvent
}
