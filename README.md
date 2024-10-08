# vanity contract address gen w/ CREATE3

node script for predictable prefixed addresses deployed from factory

1. **dependencies**:

   ```bash
   npm install ethers@5.7.2 merkletreejs keccak256

2. factoryAddress: address of your factory
3. initCode: bytecode of the contract to be deployed
4. desiredPrefix: example `0xb00b5

5. run ```bash node generate.js

6. check output
script generates a file called brain_tokens_data.json, name this file whatever you want. it includes:

vanity addresses that start with your desired prefix.
salt and merkle tree proofs for verification
