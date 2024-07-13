import { ethers } from "hardhat";
import dotenv from "dotenv";
dotenv.config()


async function main() {
  const destinationContractFactory = await ethers.getContractFactory("Receivooor");
  const destinationContract = await destinationContractFactory.deploy();

  await destinationContract.waitForDeployment();
  const address = await destinationContract.getAddress();
  console.log("Destination Receivoor  deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
