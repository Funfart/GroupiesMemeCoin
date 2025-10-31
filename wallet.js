// wallet.js
import { ethers } from "ethers";
import { updateUIStatus } from "./ui.js";

// ✅ configure your deployed contract
const CONTRACT_ADDRESS = "0xYOUR_CONTRACT_ADDRESS";
const CONTRACT_ABI = [ /* paste your ABI here */ ];

let provider, signer, contract, decimals;

export async function connectWallet() {
  try {
    if (!window.ethereum) throw new Error("MetaMask not found");
    await window.ethereum.request({ method: "eth_requestAccounts" });
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    decimals = await contract.decimals();
    const address = await signer.getAddress();
    updateUIStatus(`✅ Connected: ${address.slice(0, 6)}...${address.slice(-4)}`);
    return { provider, signer, contract, decimals };
  } catch (err) {
    console.error("Wallet connect failed:", err);
    updateUIStatus("❌ Wallet connection failed");
  }
}

export function getContract() {
  if (!contract) throw new Error("Contract not initialized. Connect wallet first.");
  return { contract, signer, decimals };
}
