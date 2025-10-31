export const CONTRACT_ADDRESS = "0xYourContractAddressHere";
export const CHAIN_ID = "0x89"; // Polygon (change if needed)

export const ABI = [
  // --- Minimal ABI Example (extend with your actual contract ABI) ---
  "function depositToPool(uint256 amount) payable",
  "function voteOnEvent(uint256 eventId, bool support)",
  "function getEvent(uint256 eventId) view returns (tuple(uint256 id,string title,uint256 startTime,uint256 endTime,uint256 yesVotes,uint256 noVotes,bool finalized,bool passed,uint256 passThreshold))",
  "function marketPoolBalance() view returns (uint256)",
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
];
