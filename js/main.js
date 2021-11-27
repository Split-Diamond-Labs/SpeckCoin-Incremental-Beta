setInterval(() => {
  // Updates
  refresh();
}, 10);

setInterval(() => {
  // Buildings 
  $_$["speckCoin"]["owned"] += Math.floor($_$["speckCoin"]["buildings"]["tier1"]["owned"]) * $_$["speckCoin"]["buildings"]["tier1"]["baseRate"] * $_$["speckCoin"]["buildings"]["tier1"]["multiplier"] / 100;
  for (i = 2; i <= 5; i++) {
    $_$["speckCoin"]["buildings"]["tier" + (i - 1)]["owned"] += Math.floor($_$["speckCoin"]["buildings"]["tier" + i]["owned"]) * $_$["speckCoin"]["buildings"]["tier" + i]["baseRate"] * $_$["speckCoin"]["buildings"]["tier" + i]["multiplier"] / 100;
  }

  for (i = 1; i <= 5; i++) {
    $_$["speckCoin"]["buildings"]["tier" + i]["multiplier"] += 0.00001 * $_$["products"]["deltamine"]["owned"];
  }

  for (i = 1; i <= 5; i++) {
    $_$["products"]["deltamine"]["owned"] += Math.floor($_$["diamond"]["buildings"]["tier" + i]["owned"]) * $_$["diamond"]["buildings"]["tier" + i]["baseRate"] * $_$["diamond"]["buildings"]["tier" + i]["multiplier"] / 100;
  }
}, 10);
