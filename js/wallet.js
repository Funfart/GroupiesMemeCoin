import { getProvider } from "./utils.js";

export async function connectWallet() {
  try {
    const provider = await getProvider();
    const accounts = await provider.listAccounts();
    if (!accounts.length) throw new Error("No wallet connected");
    const address = accounts[0];
    document.getElementById("walletAddress").textContent = address;
    return address;
  } catch (err) {
    console.error("Wallet connect error:", err);
    alert("Wallet connection failed.");
  }
}
