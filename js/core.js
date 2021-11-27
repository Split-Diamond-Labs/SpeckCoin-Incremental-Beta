// CORE FUNCTIONS


// Display Functions 

function hideById(id) {
    document.getElementById(id).style.display = "none";
}

function showById(id) {
    document.getElementById(id).style.display = "block";
}


// Misc Functions 

function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function romanize(num) {
    var lookup = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 },
        roman = '',
        i;
    for (i in lookup) {
        while (num >= lookup[i]) {
            roman += i;
            num -= lookup[i];
        }
    }
    return roman;
}

function format(num, showDecimals = false) {
    const numInSciNot = {};
    [numInSciNot.coefficient, numInSciNot.exponent] =
    num.toExponential(2).split('e').map(item => Number(item));
    return (num >= 1000000) ? `${numInSciNot.coefficient}e${numInSciNot.exponent}` : (showDecimals ? String(num) : String(Math.floor(num)));
}


// Data Functions 

function saveGame() {
    localStorage.setItem(`game_saved_${game.version}`, true);
    localStorage.setItem(`json_save_${game.version}`, JSON.stringify($_$));
}

function loadGameTo() {
    if (!localStorage.getItem(`game_saved_${game.version}`)) {
        return false;
    }
    $_$ = JSON.parse(localStorage.getItem(`json_save_${game.version}`));
    return true;
}

function importSave() {
    const selectedFile = document.getElementById('importSave').files[0];
    let fileReader = new FileReader();
    fileReader.onload = function(e) {
        $_$ = JSON.parse(atob(e.target.result));
    };
    fileReader.readAsText(selectedFile);
    document.getElementById('closeoptions').click();
}

function exportSave() {
    let saveFile = new Blob([btoa(JSON.stringify($_$))], { type: "text/json;charset=utf-8" });
    setTimeout(function() { saveAs(saveFile, `speckcoin-incremental-${game.version}-save.json`); }, 1000);
}

function reset() {
    $_$ = dataObject;
}

function refresh() {
    for (let i = 1; i <= 5; i++) {
        document.getElementById("CBA" + i).innerText = format(Math.floor($_$["speckCoin"]["buildings"]["tier" + i]["owned"]));
        document.getElementById("CBC" + i).innerText = format(Math.floor($_$["speckCoin"]["buildings"]["tier" + i]["cost"]));
        document.getElementById("CBP" + i).innerText = format($_$["speckCoin"]["buildings"]["tier" + i]["baseRate"] * Math.floor($_$["speckCoin"]["buildings"]["tier" + i]["owned"]) * $_$["speckCoin"]["buildings"]["tier" + i]["multiplier"]);
        document.getElementById("CBR" + i).innerText = format($_$["speckCoin"]["buildings"]["tier" + i]["baseRate"] * $_$["speckCoin"]["buildings"]["tier" + i]["multiplier"]);
        if (available("speckCoin", i)) {
            document.getElementById("CB" + i).style.backgroundColor = "orange";
        } else {
            document.getElementById("CB" + i).style.backgroundColor = "black";
        }
        if (!$_$["speckCoin"]["buildings"]["tier" + i]["unlocked"]) {
            document.getElementById("CB" + i).style.display = "none";
            if ($_$["speckCoin"]["owned"] >= ($_$["speckCoin"]["buildings"]["tier" + i]["cost"]) / 2) {
                document.getElementById("CB" + i).style.display = "block";
                $_$["speckCoin"]["buildings"]["tier" + i]["unlocked"] = true;
            }
        } else {
            document.getElementById("CB" + i).style.display = "block";
        }
    }
    document.getElementById("speckcoin-value").innerText = format(Math.floor($_$["speckCoin"]["owned"]));

    if (!$_$["resets"]["diamond"]["unlocked"]) {
        document.getElementById("prestige").style.display = "none";
        if ($_$["speckCoin"]["owned"] >= Math.sqrt($_$["resets"]["diamond"]["cost"])) {
            document.getElementById("prestige").style.display = "block";
            $_$["resets"]["diamond"]["unlocked"] = true;
        } else {
            document.getElementById("prestige").style.display = "none";
        }
    }

    if (resetAvailable("diamond")) {
        document.getElementById("prestige").color = "white";
        document.getElementById("prestige").backgroundColor = "cyan";
    } else {
        document.getElementById("prestige").color = "cyan";
        document.getElementById("prestige").backgroundColor = "black";
    }

    for (let i = 1; i <= 5; i++) {
        document.getElementById("DBA" + i).innerText = format(Math.floor($_$["diamond"]["buildings"]["tier" + i]["owned"]));
        document.getElementById("DBC" + i).innerText = format(Math.floor($_$["diamond"]["buildings"]["tier" + i]["cost"]));
        document.getElementById("DBP" + i).innerText = format($_$["diamond"]["buildings"]["tier" + i]["baseRate"] * Math.floor($_$["diamond"]["buildings"]["tier" + i]["owned"]) * $_$["diamond"]["buildings"]["tier" + i]["multiplier"]);
        if (available("diamond", i)) {
            document.getElementById("DB" + i).style.backgroundColor = "cyan";
        } else {
            document.getElementById("DB" + i).style.backgroundColor = "black";
        }
        if (!$_$["diamond"]["buildings"]["tier" + i]["unlocked"]) {
            document.getElementById("DB" + i).style.display = "none";
            if ($_$["diamond"]["owned"] >= ($_$["diamond"]["buildings"]["tier" + i]["cost"]) / 2) {
                document.getElementById("DB" + i).style.display = "block";
                $_$["diamond"]["buildings"]["tier" + i]["unlocked"] = true;
            }
        } else {
            document.getElementById("DB" + i).style.display = "block";
        }
    }
    document.getElementById("diamond-value").innerText = format(Math.floor($_$["diamond"]["owned"]));
    document.getElementById("deltamine-value").innerText = format(Math.floor($_$["products"]["deltamine"]["owned"]));

    if ($_$["diamond"]["unlocked"]) {
        document.getElementById("diamond-resource").style.display = "block";
        document.getElementById("deltamine-product").style.display = "block";
    } else {
        document.getElementById("diamond-resource").style.display = "none";
        document.getElementById("deltamine-product").style.display = "none";
    }
}
