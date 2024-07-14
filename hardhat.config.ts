import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import dotenv from "dotenv";
import "./tasks/create_ad";
dotenv.config();

const private_key = process.env.PRIVATE_KEY || "";

const config: HardhatUserConfig = {
  solidity: "0.8.0",
  networks: {
    hardhat: {},
    scroll_testnet: {
      url: "https://sepolia-rpc.scroll.io/",
      accounts: [private_key],
    },
    fhenix_testnet: {
      url: "https://api.helium.fhenix.zone",
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
    zircuit_testnet: {
      url: `https://zircuit1.p2pify.com`,
      chainId:  48899,
      accounts: [private_key]
    }
  },
  etherscan: {
    apiKey: {
      scroll_testnet: process.env.SCROLL_SCAN_API_KEY || "",
      fhenix_testnet: process.env.SCAN_API_KEY || "",
      zircuit_testnet: process.env.ZIRCUIT_SCAN_API_KEY || ""
    },
    customChains: [
      {
        network: "scroll_testnet",
        chainId: 534351,
        urls: {
          apiURL: "https://api-sepolia.scrollscan.com/api",
          browserURL: "https://sepolia.scrollscan.dev/",
        },
      },
      {
        network: "linea_goerli",
        chainId: 59140,
        urls: {
          apiURL: "https://api-testnet.lineascan.build/api",
          browserURL: "https://goerli.lineascan.build/",
        },
      },
      {
        network: "fhenix_testnet",
        chainId: 8008135,
        urls: {
          apiURL: "https://api.helium.fhenix.zone",
          browserURL: "https://explorer.helium.fhenix.zone",
        },
      },
      {
        network: "zircuit_testnet",
        chainId: 48899,
        urls: {
          apiURL: "https://explorer.zircuit.com/api/contractVerifyHardhat",
          browserURL: "https://explorer.zircuit.com/"
        }
      }
    ],
  },
  sourcify: {
    enabled: false,
  }
};

export default config;
