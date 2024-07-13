import { ethers } from "hardhat";
import dotenv from "dotenv";
dotenv.config()

const mailbox_address = process.env.MAILBOX_ADDRESS || "";

async function main() {
  const AdContractFactory = await ethers.getContractFactory("AdContract");
  const adContract = await AdContractFactory.deploy(mailbox_address);

  await adContract.waitForDeployment();
  const address = await adContract.getAddress();
  console.log("AdContract deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
