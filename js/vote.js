import { getSigner, getContract } from "./utils.js";

export async function voteOnEvent(eventId, support) {
  try {
    const signer = await getSigner();
    const contract = await getContract(signer);
    const tx = await contract.voteOnEvent(eventId, support);
    document.getElementById("voteStatus").textContent = "Voting...";
    await tx.wait();
    document.getElementById("voteStatus").textContent = "Vote submitted ✅";
  } catch (err) {
    console.error("Vote failed:", err);
    document.getElementById("voteStatus").textContent = "Vote failed ❌";
  }
}

export async function getVoteEvent(eventId) {
  try {
    const contract = await getContract();
    const event = await contract.getEvent(eventId);
    const yes = Number(event.yesVotes);
    const no = Number(event.noVotes);
    const pass = event.passed;
    const finalized = event.finalized;

    const bar = document.getElementById("voteBar");
    const total = yes + no || 1;
    const yesPercent = Math.floor((yes / total) * 100);
    bar.style.width = `${yesPercent}%`;
    bar.textContent = `${yesPercent}% Pass`;

    document.getElementById("voteResults").textContent = finalized
      ? pass ? "✅ PASSED" : "❌ BASHED"
      : "🕒 Voting in progress...";
  } catch (err) {
    console.error("Get event error:", err);
  }
}
