# Hyperlane Deployments

[Deploy Hyperlane to a new chain](https://docs.hyperlane.xyz/docs/deploy-hyperlane)

## Fhenix (Testnet)
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
## Zircuit (Testnet)
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

## Scroll (Testnet)
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