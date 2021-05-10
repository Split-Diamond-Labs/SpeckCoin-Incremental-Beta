// Tried to put into Core class, failed 
/**
 * This function displays the numbers such as 1,234 or 1.00e1234 or 1.00e1.234M.
 * @param {Decimal | number} input number/Decimal to be formatted
 * @param {number} accuracy
 * how many decimal points that are to be displayed (Values <10 if !long, <1000 if long).
 * only works up to 305 (308 - 3), however it only worked up to ~14 due to rounding errors regardless
 * @param {*} long dictates whether or not a given number displays as scientific at 1,000,000. This auto defaults to short if input >= 1e13
 */
function exponential(input, accuracy = 0, long = false) {
  let power;
  let mantissa;
  if (input instanceof Decimal) {
      // Gets power and mantissa if input is of type decimal
      power = input.e;
      mantissa = input.mantissa;
  } else if (typeof input === "number" && input !== 0) {
      // Gets power and mantissa if input is of type number and isnt 0
      power = Math.floor(Math.log10(Math.abs(input)));
      mantissa = input / Math.pow(10, power);
  } else {
      // If it isn't one of those two it isn't formattable, return 0
      return "0";
  }
  // This prevents numbers from jittering between two different powers by rounding errors
  if (mantissa > 9.9999999) {
      mantissa = 1;
      ++power;
  }
  if (mantissa < 1 && mantissa > 0.9999999) {
      mantissa = 1;
  }

  // If the power is less than 12 it's effectively 0
  if (power < -12) {
      return "0";
  } else if (power < 6 || (long && power < 13)) {
      // If the power is less than 6 or format long and less than 13 use standard formatting (123,456,789)
      // Gets the standard representation of the number, safe as power is guaranteed to be > -12 and < 13
      let standard = mantissa * Math.pow(10, power);
      // Rounds up if the number experiences a rounding error
      if (standard - Math.floor(standard) > 0.9999999) {
          standard = Math.ceil(standard);
      }
      // If the power is less than 1 or format long and less than 3 apply toFixed(accuracy) to get decimal places
      if ((power < 1 || (long && power < 3)) && accuracy > 0) {
          standard = standard.toFixed(accuracy);
      } else {
          // If it doesn't fit those criteria drop the decimal places
          standard = Math.floor(standard);
      }
      // Turn the number to string
      const standardString = standard.toString();
      // Split it on the decimal place
      const [front, back] = standardString.split('.');
      // Apply a number group 3 comma regex to the front
      const frontFormatted = numberFormatter
          ? numberFormatter.format(BigInt(front))
          : front.replace(/(\d)(?=(\d{3})+$)/g, "$1,");
      // if the back is undefined that means there are no decimals to display, return just the front
      if (back === undefined) {
          return frontFormatted;
      } else {
          // Else return the front.back
          return frontFormatted + "." + back;
      }
  } else if (power < 1e6) {
      // If the power is less than 1e6 then apply standard scientific notation
      // Makes mantissa be rounded down to 2 decimal places
      const mantissaLook = (Math.floor(mantissa * 100) / 100).toFixed(2);
      // Makes the power group 3 with commas
      const powerLook = numberFormatter
          ? numberFormatter.format(BigInt(power))
          : power.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,");
      // returns format (1.23e456,789)
      return mantissaLook + "e" + powerLook;
  } else if (power >= 1e6) {
      // if the power is greater than 1e6 apply notation scientific notation
      // Makes mantissa be rounded down to 2 decimal places
      let mantissaLook = Math.floor(mantissa * 100) / 100;
      // Makes mantissa be to 2 decimal places
      mantissaLook = mantissaLook.toFixed(2);
      mantissaLook = mantissaLook.toString();
      // Drops the power down to 4 digits total but never greater than 1000 in increments that equate to notations, (1234000 -> 1.234) ( 12340000 -> 12.34) (123400000 -> 123.4) (1234000000 -> 1.234)
      let powerDigits = Math.ceil(Math.log10(power));
      let powerFront = ((powerDigits - 1) % 3) + 1;
      let powerLook = power / Math.pow(10, powerDigits - powerFront);
      if (powerLook === 1000) {
          powerLook = 1;
          powerFront = 1;
      }
      powerLook = powerLook.toFixed(4 - powerFront);
      powerLook = powerLook.toString();
      // Return relevant notations alongside the "look" power based on what the power actually is
      if (power < 1e9) {
          return mantissaLook + "e" + powerLook + "M";
      }
      if (power < 1e12) {
          return mantissaLook + "e" + powerLook + "B";
      }
      if (power < 1e15) {
          return mantissaLook + "e" + powerLook + "T";
      }
      if (power < 1e18) {
          return mantissaLook + "e" + powerLook + "Qa";
      }
      if (power < 1e21) {
          return mantissaLook + "e" + powerLook + "Qi";
      }
      if (power < 1e24) {
          return mantissaLook + "e" + powerLook + "Sx";
      }
      if (power < 1e27) {
          return mantissaLook + "e" + powerLook + "Sp";
      }
      if (power < 1e30) {
          return mantissaLook + "e" + powerLook + "Oc";
      }
      if (power < 1e33) {
          return mantissaLook + "e" + powerLook + "No";
      }
      if (power < 1e36) {
          return mantissaLook + "e" + powerLook + "Dc";
      }
      if (power < 1e39) {
          return mantissaLook + "e" + powerLook + "UDc";
      }
      if (power < 1e42) {
          return mantissaLook + "e" + powerLook + "DDc";
      }
      if (power < 1e45) {
          return mantissaLook + "e" + powerLook + "TDc";
      }
      if (power < 1e48) {
          return mantissaLook + "e" + powerLook + "QaDc";
      }
      if (power < 1e51) {
          return mantissaLook + "e" + powerLook + "QaDc";
      }
      // If it doesn't fit a notation then default to mantissa e power
      return mantissa + "e" + power;
  } else {
      // Failsafe
      return "undefined";
  }
}

/* 
  CLASSES 
*/

    // CORE FUNCTIONS
    class Core {
      static notify(text) {
        alert(text);
      }
      static hideById(id) {
        document.getElementById(id).style.display = "none";
      }
      static showById(id) {
        document.getElementById(id).style.display = "block";
      }
      static randomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
      }

      static romanize(num) {
        var lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},roman = '',i;
        for ( i in lookup ) {
          while ( num >= lookup[i] ) {
            roman += i;
            num -= lookup[i];
          }
        }
        return roman;
      }

      static saveGame(data) {
        localStorage.setItem("local_game_saved",true);
        localStorage.setItem("coins1", data.game.coins.amounts);
        localStorage.setItem("coins2", data.game.coins.basePrices);
        localStorage.setItem("diamonds1", data.game.diamonds.amounts);
        localStorage.setItem("diamonds2", data.game.diamonds.basePrices);
        localStorage.setItem("protons1", data.game.protons.amounts);
        localStorage.setItem("protons2", data.game.protons.basePrices);
        localStorage.setItem("unlockedCoins", data.unlockedCoins);
        localStorage.setItem("unlockedDiamonds", data.unlockedDiamonds);
        localStorage.setItem("unlockedProtons", data.unlockedProtons);
      }

      static loadGameTo(data) {
        function parseBool(val) { return val === true || val === "true" }
        function stna(string) {
          var array = [];
          string.split(",").forEach(function(currentValue) {Number(array.push(currentValue));});
          return array;
        }
        function stba(string) {
          var array = [];
          string.split(",").forEach(function(currentValue) {parseBool(array.push(currentValue));});
          return array;
        }
        if (localStorage.getItem("local_game_saved") != "true") {
          console.log("No save was found, starting new game...");
          return false;
        }
        data.game.coins.amounts = stna(localStorage.getItem("coins1"));
        data.game.coins.basePrices = stna(localStorage.getItem("coins2"));
        data.game.diamonds.amounts = stna(localStorage.getItem("diamonds1"));
        data.game.diamonds.basePrices = stna(localStorage.getItem("diamonds2"));
        data.game.protons.amounts = stna(localStorage.getItem("protons1"));
        data.game.protons.basePrices = stna(localStorage.getItem("protons2"));
        data.unlockedCoins = stba(localStorage.getItem("unlockedCoins"));
        data.unlockedDiamonds = stba(localStorage.getItem("unlockedDiamonds"));
        data.unlockedProtons = stba(localStorage.getItem("unlockedProtons"));
        return true;
      }

    }

    // Resource class
    class Resource {
      constructor(amounts, basePrices) {
        this.amounts = amounts;
        this.basePrices = basePrices;
      }

      buyBuilding(lvl) {
        if (!((this.basePrices[lvl - 1] * Math.pow(1.5, this.amounts[lvl])) > this.amounts[0])) {
          this.amounts[0] -= this.basePrices[lvl - 1] * Math.pow(1.5, this.amounts[lvl]);
          this.amounts[lvl]++;
        } else {
          Core.notify("You cannot afford this!");
        }
      }

      cost(lvl) {
        return this.basePrices[lvl - 1] * Math.pow(1.5, this.amounts[lvl]);
      }
    }

    // Game class 
    class Game {
      constructor(coins, diamonds, opals, protons, neutrons) {
        this.coins = coins;
        this.diamonds = diamonds;
        this.opals = opals;
        this.protons = protons;
        this.neutrons = neutrons;
      }



    }

// Used in HTML for tabs 
    function openCity(evt, cityName) {
      // Declare all variables
      var i, tabcontent, tablinks;

      // Get all elements with class="tabcontent" and hide them
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }

      // Get all elements with class="tablinks" and remove the class "active"
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }

      // Show the current tab, and add an "active" class to the button that opened the tab
      document.getElementById(cityName).style.display = "block";
      evt.currentTarget.className += " active";
    }

// Game data (VERY IMPORTANT)
    var data = {
      game: new Game(new Resource([100, 0, 0, 0, 0, 0], [100, 2000, 40000, 800000, 16000000]), 
                     new Resource([0, 0, 0, 0, 0, 0], [1, 200, 40000, 8000000, 1600000000]),
                     new Resource([0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]),
                     new Resource([0, 0, 0, 0, 0, 0], [1, 400, 160000, 64000000, 25600000000]),
                     new Resource([0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0])
                    ),
      unlockedCoins: [true, false, false, false, false, false],
      unlockedDiamonds: [false, false, false, false, false, false],
      unlockedProtons: [false, false, false, false, false, false],
      totalResets: 0
    };

// Global Variables (For display and stuff)
let timePassed = 0;

document.getElementById("default").click();
setInterval((function() { // Update
  timePassed++;
  if (timePassed < 120) {
    Core.showById("loader");
    Core.hideById("pageContent");
  } else {
    Core.hideById("loader");
    Core.showById("pageContent");
  }
  document.getElementById("coinDisplay").innerHTML = exponential(data.game.coins.amounts[0]);
  document.getElementById("diamondDisplay").innerHTML = exponential(data.game.diamonds.amounts[0]);
  document.getElementById("protonDisplay").innerHTML = exponential(data.game.protons.amounts[0]);
  document.getElementById("coin1").innerHTML = `[${exponential(data.game.coins.amounts[1])}] Buy a Flyspeck {${exponential(10 * (data.game.opals.amounts[0] * 0.1 + 1))} each, currently: ${exponential(data.game.coins.amounts[1] * 10 * (data.game.opals.amounts[0] * 0.1 + 1))}} (${data.game.coins.cost(1)} SpeckCoin)`
  
}), 25);
setInterval(function() {
  for (var index = 1; index < data.game.coins.amounts.length; index++) {
    data.game.coins.amounts[0] += data.game.coins.amounts[index] * 10 * (data.game.opals.amounts[0] * 0.1 + 1);
  }
  for (var index = 1; index < data.game.diamonds.amounts.length; index++) {
    if (index != 1) {
      data.game.diamonds.amounts[index - 1] += data.game.diamonds.amounts[index] * 10;
    } else {
      data.game.opals.amounts[0] += data.game.diamonds.amounts[1];
    }
  }
  for (var index = 1; index < data.game.protons.amounts.length; index++) {
    if (index != 1) {
      data.game.protons.amounts[index - 1] += data.game.protons.amounts[index] * 10;
    } else {
      data.game.neutrons.amounts[0] += data.game.protons.amounts[1];
    }
  }
}, 1000);
if (Core.loadGameTo(data)) {
  console.log("Save found!");
}


window.addEventListener("beforeunload", function (e) { Core.saveGame(data) });
