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
        if (localStorage.getItem("local_game_saved") != "true") {
          console.log("No save was found, starting new game...");
          return false;
        }
        data.game.coins.amounts = localStorage.getItem("coins1");
        data.game.coins.basePrices = localStorage.getItem("coins2");
        data.game.diamonds.amounts = localStorage.getItem("diamonds1");
        data.game.diamonds.basePrices = localStorage.getItem("diamonds2");
        data.game.protons.amounts = localStorage.getItem("protons1");
        data.game.protons.basePrices = localStorage.getItem("protons2");
        data.unlockedCoins = localStorage.getItem("unlockedCoins");
        data.unlockedDiamonds = localStorage.getItem("unlockedDiamonds");
        data.unlockedProtons = localStorage.getItem("unlockedProtons");
        return true;
      }
      static exponential(number) {
        const numInSciNot = {};
        [numInSciNot.coefficient, numInSciNot.exponent] =
          number.toExponential().split('e').map(item => Number(item));

        console.log(`${numInSciNot.coefficient} x 10^${numInSciNot.exponent}`);
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
      constructor(coins, diamonds, protons) {
        this.coins = coins;
        this.diamonds = diamonds;
        this.protons = protons;
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
                     new Resource([0, 0, 0, 0, 0, 0], [1, 400, 160000, 64000000, 25600000000])
                    ),
      unlockedCoins: [true, false, false, false, false, false],
      unlockedDiamonds: [false, false, false, false, false, false],
      unlockedProtons: [false, false, false, false, false, false],
      totalResets: 0
    };


function resourcesPerSecond {
  // TODO
}


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
  document.getElementById("coinDisplay").innerHTML = data.game.coins.amounts[0];
  document.getElementById("diamondDisplay").innerHTML = data.game.diamonds.amounts[0];
  document.getElementById("protonDisplay").innerHTML = data.game.protons.amounts[0];
  document.getElementById("coin1").innerHTML = `Buy a Flyspeck [${data.game.coins.amounts[1]}] (${data.game.coins.cost(1)} SpeckCoin)`
  
}), 25);
if (Core.loadGameTo(data)) {
  console.log("Save found!");
}

window.addEventListener("beforeunload", function (e) { Core.saveGame(data) });
