const SoftReset = {
	prestige(type) {
    // Prestige function 
    if (!data.game.coins.amounts[0] >= 1e50) {
    	Core.notify("You need at least 1e50 SpeckCoins to prestige!");
      
    } else {
      // Prestige? Are you sure? 
      if (confirm("Are you sure you want to prestige? You will lose all your SpeckCoins and Coin Buildings!")) {
        switch (type) {
          case 0: // First type of prestige, name yet to be decided 
            // TODO
            break;
          case 1: // Second type of prestige, name yet to be decided 
            // TODO
            break;
          case 2: // Third type of prestige, called true prestige. Makes perfect diamonds. It will give slightly less powerful upgrades than the other two, but only perfect diamonds can be used for the next reset layer. 
            // TODO
            break;
          default:
            // Oh no, we have a problem 
            console.error(`Input Error: No prestge type ${type}`);
        }
      } else {
        return;
      }
    }
	}
}
