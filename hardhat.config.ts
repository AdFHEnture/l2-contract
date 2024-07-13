import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import dotenv from "dotenv";
dotenv.config();

const private_key = process.env.PRIVATE_KEY || "";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    hardhat: {},
    scroll_testnet: {
      url: "https://sepolia-rpc.scroll.io/",
      accounts: [private_key],
    },
    fhenix_testnet: {
      url: "https://api.testnet.fhenix.zone:7747",
      accounts: [private_key],
    },
    sepolia: {
      url: `https://rpc.notadegen.com/eth/sepolia`,
      accounts: [private_key],
    },
    arbitrum_sepolia: {
      url: `https://sepolia-rollup.arbitrum.io/rpc`,
      chainId: 421614,
      accounts: [private_key],
    },
    linea_goerli: {
      url: `https://rpc.goerli.linea.build`,
      chainId: 59140,
      accounts: [private_key],
    },
  },
  // etherscan: {
  //   apiKey: process.env.SCAN_API_KEY,
  //   customChains: [
  //     {
  //       network: "scroll_testnet",
  //       chainId: 534351,
  //       urls: {
  //         apiURL: "https://api-sepolia.scrollscan.com/api",
  //         browserURL: "https://sepolia.scrollscan.dev/",
  //       },
  //     },
  //     {
  //       network: "linea_goerli",
  //       chainId: 59140,
  //       urls: {
  //         apiURL: "https://api-testnet.lineascan.build/api",
  //         browserURL: "https://goerli.lineascan.build/",
  //       },
  //     },
  //   ],
  // },
};

export default config;
