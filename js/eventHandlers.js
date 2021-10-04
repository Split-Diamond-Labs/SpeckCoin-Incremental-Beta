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

function available(buildingType /* "coin" | "diamond" */, tier /* 1 | 2 | 3 | 4 | 5 */) {
    return $_$[buildingType + "s"] /* Amount of currency */ >= $_$[buildingType + "Buildings"]["tier" + tier]["cost"]; /* Cost of building */
}

function buyBuilding(buildingType /* "coin" | "diamond" */, tier /* 1 | 2 | 3 | 4 | 5 */) {
    if (available(buildingType, tier)) {
        $_$[buildingType + "Buildings"]["tier" + tier]["owned"]++;
        $_$[buildingType + "s"] -= $_$[buildingType + "Buildings"]["tier" + tier]["cost"];
        $_$[buildingType + "Buildings"]["tier" + tier]["cost"] *= $_$[buildingType + "Buildings"]["costFactor"];
        return true;
    } 
    return false;
}

document.getElementById("CB1").addEventListener("click", function() {
    buyBuilding("coin", 1);
});

document.getElementById("CB2").addEventListener("click", function() {
    buyBuilding("coin", 2);
});

document.getElementById("CB3").addEventListener("click", function() {
    buyBuilding("coin", 3);
});

document.getElementById("CB4").addEventListener("click", function() {
    buyBuilding("coin", 4);
});

document.getElementById("CB5").addEventListener("click", function() {
    buyBuilding("coin", 5);
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

window.addEventListener("beforeunload", function(e) { saveGame($_$); });

