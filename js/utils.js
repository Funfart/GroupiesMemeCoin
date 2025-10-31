import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.esm.min.js";
import { ABI, CONTRACT_ADDRESS } from "./config.js";

export async function getProvider() {
  if (!window.ethereum) throw new Error("Wallet not found");
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  return provider;
}

export async function getSigner() {
  const provider = await getProvider();
  return provider.getSigner();
}

export async function getContract(signerOrProvider = null) {
  const provider = signerOrProvider || (await getProvider());
  return new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
}

export function formatEther(value) {
  return ethers.utils.formatEther(value);
}

export function parseUnits(amount, decimals = 18) {
  return ethers.utils.parseUnits(amount.toString(), decimals);
}
