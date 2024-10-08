# vanity contract address gen w/ CREATE3/2

node script for predictable prefixed addresses deployed from factory

1. **dependencies**:

   ```bash
   npm install ethers@5.7.2 merkletreejs keccak256

### 2. setup

Edit the following in the script:

- **factoryAddress**: deployed contract factory.
- **initCode**: bytecode of contract to be deployed.
- **amount**: in generate.js, edit to the amount you want generated. in this repo, it's set to 2: Go to line 37:" (let i = 0; i < 2; i++) { "
- **desiredPrefix**: prefix you want for your vanity contract addresses, e.g., `0xb00b5`.

### 3. run script

run to generate the addresses:

```bash
node generate.js
```
### 4. check output

generates a file named `brain_tokens_data.json` (rename this file). includes:

- **vanity addresses**: CAs that start with your specified prefix.
- **salts**: values used to generate the addresses.
- **merkle proofs**: Proofs that verify the generated addresses.

entries in the output file provides unique vanity addresses that match desired prefix, w/ data for verification.
this is meant to be passed to the factory with your custom implementation to be deployed FROM the factory

