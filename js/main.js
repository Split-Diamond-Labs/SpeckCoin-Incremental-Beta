setInterval(() => {
  // Updates
  refresh();
}, 10);

setInterval(() => {
  // Buildings 
  $_$["speckCoin"]["owned"] += Math.floor($_$["speckCoin"]["buildings"]["tier1"]["owned"]) * $_$["speckCoin"]["buildings"]["tier1"]["baseRate"] * $_$["speckCoin"]["buildings"]["tier1"]["multiplier"] / 10;
  for (i = 2; i <= 5; i++) {
    $_$["speckCoin"]["buildings"]["tier" + (i - 1)]["owned"] += Math.floor($_$["speckCoin"]["buildings"]["tier" + i]["owned"]) * $_$["speckCoin"]["buildings"]["tier" + i]["baseRate"] * $_$["speckCoin"]["buildings"]["tier" + i]["multiplier"] / 10;
  }
}, 100);
