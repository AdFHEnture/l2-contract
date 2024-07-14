# Hyperlane Deployments
[Deploy Hyperlane to a new chain](https://docs.hyperlane.xyz/docs/deploy-hyperlane)

# Testnets
## 1) Fhenix-Testnet
### Addresses
```
staticMerkleRootMultisigIsmFactory: "0x056193A177b779254B224c8a5acB29dD2879afd9"
staticMessageIdMultisigIsmFactory: "0xde55F1e1a62396f64671213dd6055b5AdC1b7C3A"
staticAggregationIsmFactory: "0x24571025ec5011D32f9499D2052D4c375b797375"
staticAggregationHookFactory: "0x9c7a4AD1a0AE9EF37B38Cc236Fd9CF81b847e8dd"
domainRoutingIsmFactory: "0x62BB379d935bA5E7Cc1213E697AE44Df020020f9"
proxyAdmin: "0x95B3106Ac2D82c003fd876E550571F2d9fE5FF16"
mailbox: "0xF0FB4Ea7a5E1dacD1ae013146BC753A430d5A324"
interchainAccountRouter: "0xa113698f0e7fa2D9b699bAA797762Af3C31d7cb2"
interchainAccountIsm: "0xE9a75c200A9029228E96338b34DAEb7cb012fE70"
validatorAnnounce: "0xe9C512a4f0eF030E067826b296f5Cd559eAD1CB5"
testRecipient: "0xEBA630BCfebcc9FB26F0D2Dc5921E8EA41edAbf4"
```

### Metadata
```
yaml-language-server: $schema=../schema.json
name: fhenix
displayName: Fhenix
chainId: 8008135
domainId: 8008135
protocol: ethereum
rpcUrls:
  - http: https://api.helium.fhenix.zone
nativeToken:
  symbol: tFHE
  name: tFHE
  decimals: 18
blockExplorers:
  - apiUrl: https://explorer.helium.fhenix.zone/api
    family: blockscout #explorer you're using, also supporting routescan or blockscout
    name: Blockscout
    url: https://explorer.helium.fhenix.zone/
 ```
## 2) Zircuit-Testnet
### Addresses
```
staticMerkleRootMultisigIsmFactory: "0x056193A177b779254B224c8a5acB29dD2879afd9"
staticMessageIdMultisigIsmFactory: "0xde55F1e1a62396f64671213dd6055b5AdC1b7C3A"
staticAggregationIsmFactory: "0x24571025ec5011D32f9499D2052D4c375b797375"
staticAggregationHookFactory: "0x9c7a4AD1a0AE9EF37B38Cc236Fd9CF81b847e8dd"
domainRoutingIsmFactory: "0x62BB379d935bA5E7Cc1213E697AE44Df020020f9"
proxyAdmin: "0x95B3106Ac2D82c003fd876E550571F2d9fE5FF16"
mailbox: "0xF0FB4Ea7a5E1dacD1ae013146BC753A430d5A324"
interchainAccountRouter: "0xa113698f0e7fa2D9b699bAA797762Af3C31d7cb2"
interchainAccountIsm: "0xE9a75c200A9029228E96338b34DAEb7cb012fE70"
validatorAnnounce: "0xe9C512a4f0eF030E067826b296f5Cd559eAD1CB5"
testRecipient: "0xEBA630BCfebcc9FB26F0D2Dc5921E8EA41edAbf4"
```
### Metadata
```
name: zircuit
displayName: Zircuit
chainId: 48899
domainId: 48899
protocol: ethereum
rpcUrls:
  - http: https://zircuit1.p2pify.com/
nativeToken:
  symbol: ETH
  name: ETH
  decimals: 18
```

## 3) Scroll-Testnet
### Addresses
```
staticMerkleRootMultisigIsmFactory: "0xaE99c876be5a81c19F76e6539Bf16aE0ca4d2B48"
staticMessageIdMultisigIsmFactory: "0xb84c863D28c26BdEE2703af0d50eB9fCE25D5b95"
staticAggregationIsmFactory: "0xbfC52E77C38a9f7b4e3204834Ef6D83685DcdB3F"
staticAggregationHookFactory: "0xC757dd54EC3589993885acA22042B1c45270971e"
domainRoutingIsmFactory: "0xf50c81baF201977192da254fa61febdEfb7EC921"
proxyAdmin: "0x432Cf5d422E92E293807A7277B0Ac8897EBbB6B8"
mailbox: "0xCc4F801397dC53657193c8192FF47425e2312f2E"
interchainAccountRouter: "0xe4119e029C8aD66C848b8a8A157af33cb785314e"
interchainAccountIsm: "0x4565B85a928585D019eeF188cE63523A8dF0A70F"
validatorAnnounce: "0x731C332afD176d38d9a095ce97278434D7871d81"
testRecipient: "0x6a0D05f13e2014fCD825AF69De53CCAB19Fe5c34"
```
### Metadata
Default (Hyperlane CLI)

# Technical Documentation

**_1- Deploying origin and destination chain contracts_**

**Scroll Origin**: 0x8b15E115bfaEFC31402f595fe94d056Da6042344 (not updated)

**Zircuit Origin**: 0xd519cd8178098f00917CCc634728Eb3EeD164fac

**Fhenix Destination**: 0x0D6Ae73E89865aD480E4D4bFA19CB064CE23f7a9


**_2- Origin contract verification on block explorer for ease of use_**

**_3- Call createAd function with requird params and get dispatch id from internal tx_**

0x9fbabb6b767e236f9df7cbfbf504dea6f4f1e933986e9f56da37e01356029903


**_4- relay tx_**

hyperlane status --relay --id 0x9fbabb6b767e236f9df7cbfbf504dea6f4f1e933986e9f56da37e01356029903 --origin scrollsepolia --destination fhenix --registry hyperlane-registry -k e42b7d55f7ed23b306518b1b2c25a6d68df1d664e80245d7c405af63585a5c88


Message 0x9fbabb6b767e236f9df7cbfbf504dea6f4f1e933986e9f56da37e01356029903 was self-relayed!

**_5- fhenix contract log kontrol ve byte decode_**

cast --calldata-decode 'Receiveeed(uint32,bytes32,uint,string)' 0x9952f6be000000000000000000000000000000000000000000000000000000000008274f0000000000000000000000002df1b5f1cba7555579a68b256222d0062e20058b0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000050001010000000000000000000000000000000000000000000000000000000000

 cast sig 'Receiveeed(uint32,bytes32,uint,string)'
0x9952f6be

 cast --calldata-decode 'Receiveeed(uint32,bytes32,uint,string)' 0x9952f6be000000000000000000000000000000000000000000000000000000000008274f0000000000000000000000008b15e115bfaefc31402f595fe94d056da60423440000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000050100010100000000000000000000000000000000000000000000000000000000
----

**execution trace**

cast run 0xbe21e5301255865b675b24928ec4071ed816d3a5e56b692559d9b2d0537a5183 --rpc-url https://rpc.ankr.com/scroll_sepolia_testnet



