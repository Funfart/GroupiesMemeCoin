/**
 * claim.js — manages daily / streak claims
 * Connects to GroupiesMemeCoinUpgradeable claim logic
 * (requires claim() and getClaimInfo(address) functions on-chain)
 */

export async function claimTokens({ contract, signer }, setStatus) {
  if (!contract || !signer) return setStatus("Connect wallet first");
  try {
    setStatus("Claiming tokens...");
    const tx = await contract.claim();
    setStatus("Tx sent: " + tx.hash);
    await tx.wait();
    setStatus("Claim successful! 🎉");
  } catch (err) {
    console.error(err);
    if (err?.error?.message?.includes("too soon")) {
      setStatus("You must wait before your next claim ⏳");
    } else {
      setStatus(err?.message || "Claim failed");
    }
  }
}

/**
 * Get live claim state from contract for UI display.
 * Expects your contract to have getClaimInfo(address)
 * returning: (uint256 nextClaimTime, uint256 streakTier, uint256 streakCount)
 */
export async function getClaimInfo({ contract, signer }) {
  if (!contract || !signer) return null;
  try {
    const userAddr = await signer.getAddress();
    const info = await contract.getClaimInfo(userAddr);
    // info[0] = nextClaimTime (timestamp)
    // info[1] = streakTier (0=Claim, 1=Daily, 2=Weekly)
    // info[2] = streakCount (integer)
    const now = Math.floor(Date.now() / 1000);
    const waitSecs = info[0] > now ? info[0] - now : 0;
    const tierName = info[1] === 2 ? "Weekly Streak" : info[1] === 1 ? "Daily Streak" : "Claim Streak";
    return {
      nextClaim: info[0],
      tier: tierName,
      streak: info[2].toNumber ? info[2].toNumber() : Number(info[2]),
      wait: waitSecs
    };
  } catch (err) {
    console.error("getClaimInfo", err);
    return null;
  }
}

/**
 * Utility: countdown timer for the front end.
 * Call updateCountdown(element, seconds) once per second.
 */
export function updateCountdown(el, seconds) {
  if (!el) return;
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  el.textContent = `${hrs}h ${mins}m ${secs}s`;
}
