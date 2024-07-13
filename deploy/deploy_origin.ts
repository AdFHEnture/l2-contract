import { ethers } from "hardhat";
import dotenv from "dotenv";
dotenv.config()

const mailbox_address = process.env.MAILBOX_ADDRESS || "";
const destChainId = process.env.DEST_CHAIN_ID || "";

async function main() {
  const OriginContractFactory = await ethers.getContractFactory("AdContract");
  const originContract = await OriginContractFactory.deploy(mailbox_address, destChainId);

  await originContract.waitForDeployment();
  const address = await originContract.getAddress();
  console.log("Origin AdContract deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
