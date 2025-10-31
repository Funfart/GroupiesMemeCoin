// deposit.js
import { ethers } from "ethers";
import { getContract } from "./wallet.js";
import { updateUIStatus, updateUserBalance } from "./ui.js";

export async function depositForVote(amountWholeTokens) {
  try {
    const { contract, decimals } = getContract();
    const units = ethers.utils.parseUnits(amountWholeTokens.toString(), decimals);

    updateUIStatus("⏳ Depositing tokens...");
    const tx = await contract.depositForVote(units, { gasLimit: 300_000 });
    await tx.wait();

    updateUIStatus("✅ Deposit complete");
    updateUserBalance(); // refresh user data
  } catch (err) {
    console.error("Deposit failed:", err);
    updateUIStatus("❌ Deposit failed");
  }
}
