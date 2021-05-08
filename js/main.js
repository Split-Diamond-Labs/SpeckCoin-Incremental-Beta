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
    localStorage.setItem("coins", data.game.coins);
    localStorage.setItem("diamonds", data.game.diamonds);
    localStorage.setItem("protons", data.game.protons);
    localStorage.setItem("unlockedCoins", data.unlockedCoins);
    localStorage.setItem("unlockedDiamonds", data.unlockedDiamonds);
    localStorage.setItem("unlockedProtons", data.unlockedProtons);
  }

  static loadGameTo(data) {
    if (localStorage.getItem("local_game_saved") != "true") {
      console.log("No save was found, starting new game...");
      return false;
    }
    data.game.coins = localStorage.getItem("coins");
    data.game.diamonds = localStorage.getItem("diamonds");
    data.game.protons = localStorage.getItem("protons");
    data.unlockedCoins = localStorage.getItem("unlockedCoins");
    data.unlockedDiamonds = localStorage.getItem("unlockedDiamonds");
    data.unlockedProtons = localStorage.getItem("unlockedProtons");
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
      this.amounts[lvl]++;
      this.amounts[0] -= this.basePrices[lvl - 1] * Math.pow(1.5, this.amounts[lvl]);
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

window.addEventListener("beforeunload", function (e) { saveGame(data) });
