import { task } from "hardhat/config";
import { ethers } from "hardhat";

task("create-ad", "Creates a new ad")
  .addParam("contract", "The address of the AdContract")
  .addParam("title", "The title of the ad")
  .addParam("content", "The content of the ad")
  .addParam("duration", "The duration of the ad in seconds")
  .addParam("recipient", "The recipient address on the destination chain")
  .addParam("vector", "The ad vector (comma-separated booleans)")
  .setAction(async (taskArgs, hre) => {
    const [deployer] = await hre.ethers.getSigners();
    const adContract = await hre.ethers.getContractAt("AdContract", taskArgs.contract);

    const vector = taskArgs.vector.split(",").map((val: string) => val === "true");

    const tx = await adContract.connect(deployer).createAd(
      taskArgs.title,
      taskArgs.content,
      taskArgs.duration,
      vector,
      taskArgs.recipient
      { value: hre.ethers.parseEther((taskArgs.duration * 0.01).toString()) }

    );

    await tx.wait();
    console.log("Ad created:", tx.hash);
  });

module.exports = {};
