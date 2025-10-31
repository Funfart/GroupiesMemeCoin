import { getSigner, getContract, parseUnits } from "./utils.js";

export async function depositToPool(amount) {
  try {
    const signer = await getSigner();
    const contract = await getContract(signer);

    const decimals = 18; // adjust if token uses different decimals
    const value = parseUnits(amount, decimals);

    const tx = await contract.depositToPool(value, { value });
    document.getElementById("txStatus").textContent = "Depositing...";
    await tx.wait();
    document.getElementById("txStatus").textContent = "Deposit successful ✅";
  } catch (err) {
    console.error("Deposit failed:", err);
    document.getElementById("txStatus").textContent = "Deposit failed ❌";
  }
}
