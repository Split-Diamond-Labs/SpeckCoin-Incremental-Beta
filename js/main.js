// Tried to put into Core class, failed 
/**
 * This function displays the numbers such as 1,234 or 1.00e1234 or 1.00e1.234M.
 * @param {Decimal | number} input number/Decimal to be formatted
 * @param {number} accuracy
 * how many decimal points that are to be displayed (Values <10 if !long, <1000 if long).
 * only works up to 305 (308 - 3), however it only worked up to ~14 due to rounding errors regardless
 * @param {*} long dictates whether or not a given number displays as scientific at 1,000,000. This auto defaults to short if input >= 1e13
 */
function format(num) {
  const numInSciNot = {};
        [numInSciNot.coefficient, numInSciNot.exponent] =
          num.toExponential(2).split('e').map(item => Number(item));
        return (num >= 1000000) ? `${numInSciNot.coefficient}e${numInSciNot.exponent}` : String(num);
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
  document.getElementById("coinDisplay").innerHTML = format(data.game.coins.amounts[0]);
  document.getElementById("diamondDisplay").innerHTML = format(data.game.diamonds.amounts[0]);
  document.getElementById("protonDisplay").innerHTML = format(data.game.protons.amounts[0]);
  document.getElementById("coin1").innerHTML = `[${format(data.game.coins.amounts[1])}] Buy a Flyspeck {${format(10 * (data.game.opals.amounts[0] * 0.1 + 1))} each, currently: ${format(data.game.coins.amounts[1] * 10 * (data.game.opals.amounts[0] * 0.1 + 1))}} (${format(data.game.coins.cost(1))} SpeckCoin)`
  
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
