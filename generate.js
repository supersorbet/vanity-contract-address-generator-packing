const ethers = require("ethers");
const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
const fs = require("fs");

function computeCreate3Address(deployerAddress, salt, initCodeHash) {
    return ethers.utils.getCreate2Address(
        deployerAddress,
        salt,
        initCodeHash
    );
}

function hash(tokenId, salt) {
    return ethers.utils.solidityKeccak256(
        ["uint256", "bytes32"],
        [tokenId, salt]
    );
}

async function main() {
    const factoryAddress = "0xDCB5Fd9685Ef0cF8b960775361e34Ca35c562D39";
    const initCode = "0x60288060093d393df36001600581360334348434363434376d01e4a82b33373de1334e7d8f48795af49247f034521b34f3";
    const initCodeHash = ethers.utils.keccak256(initCode);
    const salts = Array.from({ length: 50 }, (_, i) => ({
        tokenId: i,
        salt: ethers.utils.randomBytes(32)
    }));

    const addresses = salts.map(({ tokenId, salt }) => 
        computeCreate3Address(factoryAddress, salt, initCodeHash)
    );

    const leaves = salts.map(({ tokenId, salt }) => hash(tokenId, salt));
    const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
    const merkleRoot = tree.getHexRoot();

    const result = {
        merkleRoot,
        tokens: salts.map(({ tokenId, salt }, index) => {
            const leaf = hash(tokenId, salt);
            const proof = tree.getHexProof(leaf);
            return {
                tokenId,
                salt: `0x${salt.toString('hex')}`,
                address: addresses[index],
                proof
            };
        })
    };

    fs.writeFileSync('brain_tokens_data.json', JSON.stringify(result, null, 2));
    console.log("Data has been written to brain_tokens_data.json");
}

main().catch(error => {
    console.error(error);
    process.exit(1);
});
