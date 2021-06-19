// Tried to put into Core class, failed
function format(num) {
  const numInSciNot = {};
        [numInSciNot.coefficient, numInSciNot.exponent] =
          num.toExponential(2).split('e').map(item => Number(item));
        return (num >= 1000000) ? `${numInSciNot.coefficient}e${numInSciNot.exponent}` : String(num);
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
  unlockedCoins: [true, true, false, false, false, false],
  unlockedDiamonds: [false, false, false, false, false, false],
  unlockedProtons: [false, false, false, false, false, false],
  totalResets: 0
};
function reset() {
  data = {
      game: new Game(new Resource([100, 0, 0, 0, 0, 0], [100, 2000, 40000, 800000, 16000000]), 
                     new Resource([0, 0, 0, 0, 0, 0], [1, 200, 40000, 8000000, 1600000000]),
                     new Resource([0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]),
                     new Resource([0, 0, 0, 0, 0, 0], [1, 400, 160000, 64000000, 25600000000]),
                     new Resource([0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0])
                    ),
      unlockedCoins: [true, true, false, false, false, false],
      unlockedDiamonds: [false, false, false, false, false, false],
      unlockedProtons: [false, false, false, false, false, false],
      totalResets: 0
    };

}

// Global Variables (For display and stuff)
let timePassed = 0;
let secondsPassed = 0;


if (Core.loadGameTo(data)) {
  console.log("Save found!");
} else {
  reset();
}


document.getElementById("default").click();
setInterval((function() { // Update
  timePassed++;
  
  if (timePassed < 600) {
    Core.showById("loader");
    Core.hideById("pageContent");
  } else {
    Core.hideById("loader");
    Core.showById("pageContent");
  }
  
  document.getElementById("coinDisplay").innerHTML = format(data.game.coins.amounts[0]);
  document.getElementById("diamondDisplay").innerHTML = format(data.game.diamonds.amounts[0]);
  document.getElementById("protonDisplay").innerHTML = format(data.game.protons.amounts[0]);
  
  document.getElementById("coin1").innerHTML = `[${format(data.game.coins.amounts[1])}] Flyspeck {${format(10 * (data.game.opals.amounts[0] * 0.1 + 1))} SpeckCoin per second each, currently: ${format(data.game.coins.amounts[1] * 10 * (data.game.opals.amounts[0] * 0.1 + 1))} SpC/s} (${format(data.game.coins.cost(1))} SpeckCoin)`
  document.getElementById("coin2").innerHTML = `[${format(data.game.coins.amounts[2])}] Cloner {${format((data.game.opals.amounts[0] * 0.1 + 1))} Flyspecks per second each, currently: ${format(data.game.coins.amounts[2] * (data.game.opals.amounts[0] * 0.1 + 1))} Fpc/s} (${format(data.game.coins.cost(2))} SpeckCoin)`
  document.getElementById("coin3").innerHTML = `[${format(data.game.coins.amounts[3])}] Daydream {${format((data.game.opals.amounts[0] * 0.1 + 1))} Cloners per second each, currently: ${format(data.game.coins.amounts[3] * (data.game.opals.amounts[0] * 0.1 + 1))} Clnr/s} (${format(data.game.coins.cost(3))} SpeckCoin)`
  document.getElementById("coin4").innerHTML = `[${format(data.game.coins.amounts[4])}] Lollipop {${format((data.game.opals.amounts[0] * 0.1 + 1))} Daydreams per second each, currently: ${format(data.game.coins.amounts[4] * (data.game.opals.amounts[0] * 0.1 + 1))} Drm/s} (${format(data.game.coins.cost(4))} SpeckCoin)`
  document.getElementById("coin5").innerHTML = `[${format(data.game.coins.amounts[5])}] Fly God {${format((data.game.opals.amounts[0] * 0.1 + 1))} Lollipops per second each, currently: ${format(data.game.coins.amounts[5] * (data.game.opals.amounts[0] * 0.1 + 1))} Llp/s} (${format(data.game.coins.cost(5))} SpeckCoin)`
  
  for (var index = 1; index < data.unlockedCoins.length; index++) {
    if (data.game.coins.amounts[0] >= data.game.coins.cost(index)/2 && !data.unlockedCoins[index]) {
      data.unlockedCoins[index] = true;
    }                      
  }
  for (var index = 1; index < data.unlockedCoins.length; index++) {    
    if (data.unlockedCoins[index]) {
      Core.showById("coinDisp" + index);
    } else {
      Core.hideById("coinDisp" + index);
    }
  }
}), 5);

setInterval(function() {
  data.game.coins.amounts[0] += data.game.coins.amounts[1] * 10 * (data.game.opals.amounts[0] * 0.1 + 1);
  data.game.coins.produced[0] += data.game.coins.amounts[1] * 10 * (data.game.opals.amounts[0] * 0.1 + 1);
  
  for (var index = 2; index < data.game.coins.amounts.length; index++) {
    data.game.coins.amounts[index - 1] += data.game.coins.amounts[index] * (data.game.opals.amounts[0] * 0.1 + 1);
    data.game.coins.produced[index - 1] += data.game.coins.amounts[index] * (data.game.opals.amounts[0] * 0.1 + 1);
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


window.addEventListener("beforeunload", function (e) { Core.saveGame(data) });

if (document.addEventListener) {
  document.addEventListener('contextmenu', function(e) {
    Core.notify("Lol, right-click doesn't work");
    e.preventDefault();
  }, false);
} else {
  document.attachEvent('oncontextmenu', function() {
    Core.notify("Lol, right-click doesnt work");
    window.event.returnValue = false;
  });
}

Core.notify("Click the icons to buy");
