// vote.js
import { ethers } from "ethers";
import { getContract } from "./wallet.js";
import { updateUIStatus, updateVoteResults } from "./ui.js";

// 🗳️ Cast vote
export async function voteOnEvent(eventId, amountWholeTokens, pass) {
  try {
    const { contract, decimals } = getContract();
    const units = ethers.utils.parseUnits(amountWholeTokens.toString(), decimals);

    updateUIStatus("⏳ Casting vote...");
    const tx = await contract.voteOnEvent(eventId, units, pass, { gasLimit: 300_000 });
    await tx.wait();

    updateUIStatus("✅ Vote recorded");
    await loadVoteEvent(eventId); // refresh event after vote
  } catch (err) {
    console.error("Vote failed:", err);
    updateUIStatus("❌ Vote failed");
  }
}

// 📊 Load & display event results
export async function loadVoteEvent(eventId) {
  try {
    const { contract, decimals } = getContract();
    const [
      id,
      title,
      startTime,
      endTime,
      yesVotes,
      noVotes,
      finalized,
      passed,
      passThreshold
    ] = await contract.getVoteEvent(eventId);

    const yes = ethers.utils.formatUnits(yesVotes, decimals);
    const no = ethers.utils.formatUnits(noVotes, decimals);
    const threshold = ethers.utils.formatUnits(passThreshold, decimals);

    const now = Math.floor(Date.now() / 1000);
    let status;
    if (now < startTime) status = "Upcoming";
    else if (now <= endTime) status = "Live";
    else if (!finalized) status = "Ended (pending)";
    else status = passed ? "✅ PASSED" : "❌ BASHED";

    updateVoteResults({
      id,
      title,
      yes,
      no,
      threshold,
      status,
      finalized,
      passed
    });
  } catch (err) {
    console.error("Load Vote Event failed:", err);
    updateUIStatus("❌ Failed to load vote event");
  }
}
