import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { AdCreated } from "../generated/schema"
import { AdCreated as AdCreatedEvent } from "../generated/AdContract/AdContract"
import { handleAdCreated } from "../src/ad-contract"
import { createAdCreatedEvent } from "./ad-contract-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let adId = BigInt.fromI32(234)
    let advertiser = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let adTitle = "Example string value"
    let expiresAt = BigInt.fromI32(234)
    let budget = BigInt.fromI32(234)
    let newAdCreatedEvent = createAdCreatedEvent(
      adId,
      advertiser,
      adTitle,
      expiresAt,
      budget
    )
    handleAdCreated(newAdCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AdCreated created and stored", () => {
    assert.entityCount("AdCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AdCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "adId",
      "234"
    )
    assert.fieldEquals(
      "AdCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "advertiser",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AdCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "adTitle",
      "Example string value"
    )
    assert.fieldEquals(
      "AdCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "expiresAt",
      "234"
    )
    assert.fieldEquals(
      "AdCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "budget",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
