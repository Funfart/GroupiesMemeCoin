// ui.js
export function updateUIStatus(msg) {
  const el = document.getElementById("status");
  if (el) el.innerText = msg;
  console.log(msg);
}https://github.com/Funfart/GroupiesMemeCoin/tree/main

export function updateUserBalance() {
  // Placeholder: integrate API call or read contract balance
  console.log("Refreshing user balance...");
  // Example:
  // const bal = await contract.balanceOf(user);
  // document.getElementById("balance").innerText = formatUnits(bal, decimals);
}

export function updateVoteResults(data) {
  console.log("Vote Results:", data);
  const { title, yes, no, threshold, status } = data;
  document.getElementById("eventTitle").innerText = title;
  document.getElementById("yesVotes").innerText = yes;
  document.getElementById("noVotes").innerText = no;
  document.getElementById("threshold").innerText = threshold;
  document.getElementById("statusText").innerText = status;
}
