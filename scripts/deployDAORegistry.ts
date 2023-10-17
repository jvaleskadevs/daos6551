import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  
  const ERC6551Registry = "0x7721337863daEF71011c4Cb690CE895228b4dFFF";
  const DAOTBA = "0x9Eaa853832f32f77027328c976b4570Db9066630";
  const DAORegistry = await ethers.deployContract("contracts/DAORegistry6909.sol:DAORegistry", [ERC6551Registry, DAOTBA]);

  await DAORegistry.waitForDeployment();

  console.log("/////////////////////////");
  console.log(
    `DAORegistry deployed to ${DAORegistry.target}`
  );
  console.log("/////////////////////////");
  
  const daoUri = "ipfs://bafyreicvasglirukzsyxboin5iztpby74slxezcjzmoqq2ntewnrwdo53y/metadata.json";
  const daoPrice = ethers.parseEther("0.001");
  const sismoGroupId = "0xda1c3726426d5639f4c6352c2c976b87";
  
  let tx = await DAORegistry.createDAO(daoUri, daoPrice, sismoGroupId);
  console.log(tx);
  
  console.log("/////////////////////////");
  console.log("DAO #1 created.");
  console.log("/////////////////////////");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
