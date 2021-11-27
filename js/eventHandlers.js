function changeStuff() {
    document.getElementById("lore-text").innerText = lore[++loreIndex];
}

let url = new URL(window.location.href); 

if (!localStorage.getItem("game_savedeth") || url.searchParams.get("lore")) {
    window.addEventListener("load", function() {
        setTimeout(function() {
            document.getElementById("click-to-start").innerText = "Click to start";
            window.addEventListener("click", function() {
                showById("gameplay");
                hideById("loader")
            });
        }, 38000);
    })

    document.getElementById("lore").addEventListener("animationiteration", changeStuff, false);

    document.getElementById("lore").addEventListener("animationend", function(e) {
        hideById("lore");
        showById("logo");
    }, false);
    document.getElementsByClassName("logo")[0].addEventListener("animationend", function(e) {
        hideById("logo");
        showById("logo2");
    }, false);
} else {
    skipLore();
}

function skipLore() {
    showById("gameplay");
    hideById("loader");
}

function tierUnder(tier) {
    return $_$["resources"][$_$["resources"].indexOf(tier) - 1];
}

function available(buildingType /* "coin" | "diamond" */, tier /* 1 | 2 | 3 | 4 | 5 */) {
    return $_$[buildingType]["owned"] /* Amount of currency */ >= $_$[buildingType]["buildings"]["tier" + tier]["cost"]; /* Cost of building */
}

function buyBuilding(buildingType /* "coin" | "diamond" */, tier /* 1 | 2 | 3 | 4 | 5 */) {
    if (available(buildingType, tier)) {
        $_$[buildingType]["buildings"]["tier" + tier]["owned"]++;
        $_$[buildingType]["owned"] -= $_$[buildingType]["buildings"]["tier" + tier]["cost"];
        $_$[buildingType]["buildings"]["tier" + tier]["cost"] *= $_$[buildingType]["costFactor"];
        return true;
    } 
    return false;
}

function resetAvailable(tier) {
    return $_$["resets"][tier]["cost"] <= $_$[tierUnder(tier)]["owned"];
}

function buyReset(tier) {
    if (!resetAvailable(tier)) return false;
    for (building in $_$[tierUnder(tier)]["buildings"]) {
        $_$[tierUnder(tier)]["buildings"][building]["owned"] = 0;
        $_$[tierUnder(tier)]["buildings"][building]["produced"] = 0;
        $_$[tierUnder(tier)]["buildings"][building]["multiplier"] = 1;
        $_$[tierUnder(tier)]["buildings"][building]["cost"] = dataObject[tierUnder(tier)]["buildings"][building]["cost"];
    }
    
    let costPassed = false;
    let currentCost = $_$["resets"][tier]["cost"];
    
    do {
        $_$[tier]["owned"]++;
        currentCost *= 1.1; 
        if (currentCost > $_$[tierUnder(tier)]["owned"]) costPassed = true;
    } while (!costPassed)
    $_$[tierUnder(tier)]["owned"] = dataObject[tierUnder(tier)]["owned"];
    $_$[tier]["unlocked"] = true;
}

document.getElementById("CB1").addEventListener("click", function() {
    buyBuilding("speckCoin", 1);
});

document.getElementById("CB2").addEventListener("click", function() {
    buyBuilding("speckCoin", 2);
});

document.getElementById("CB3").addEventListener("click", function() {
    buyBuilding("speckCoin", 3);
});

document.getElementById("CB4").addEventListener("click", function() {
    buyBuilding("speckCoin", 4);
});

document.getElementById("CB5").addEventListener("click", function() {
    buyBuilding("speckCoin", 5);
});

document.getElementById("prestige").addEventListener("click", function() {
    buyReset("diamond");
});

document.getElementById("DB1").addEventListener("click", function() {
    buyBuilding("diamond", 1);
});

document.getElementById("DB2").addEventListener("click", function() {
    buyBuilding("diamond", 2);
});

document.getElementById("DB3").addEventListener("click", function() {
    buyBuilding("diamond", 3);
});

document.getElementById("DB4").addEventListener("click", function() {
    buyBuilding("diamond", 4);
});

document.getElementById("DB5").addEventListener("click", function() {
    buyBuilding("diamond", 5);
});

// for (let i = 1; i <= 5; i++) {
//     document.getElementById("CB" + i).addEventListener("click", () => { buyBuilding("coin", i); });
// }

if (url.searchParams.get("devMode")) {
    setTimeout(() => { document.write("<h1 style='font-family: \"Segoe UI\"; font-size: 500%;'>DevMode does not exist, sorry for the inconvenience.</h1>") }, 1);
}

let images = document.getElementsByTagName('IMG');

for (let i = 0; i < images.length; i++) {
    images[i].ondragstart = function() { return false; };
}

let autoSave = setInterval(saveGame, 30000);

function setAutoSave(newInterval) {
  clearInterval(autoSave);
  autoSave = setInterval(saveGame, newInterval);
}

var slider = document.getElementById("autoSave");

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  document.getElementById("output").innerText = "" + Math.floor(this.value / 10) + "." + this.value % 10;
  setAutoSave(this.value * 100, true);
}
