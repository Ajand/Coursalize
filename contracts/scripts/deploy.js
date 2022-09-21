// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
require("@nomiclabs/hardhat-etherscan");

const registryAddress = "0x4b48841d4b32C4650E4ABc117A03FE8B51f38F68";

async function main() {
  const Courses = await hre.ethers.getContractFactory("Courses");
  const courses = await Courses.deploy(registryAddress);

  await courses.deployed();

  console.log(`Coursesdeployed at: ${courses.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
