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

function saveGame(data) {
    localStorage.setItem("game_savedeth", true);
    localStorage.setItem("json_save", JSON.stringify($_$));
}

function loadGameTo() {
    if (localStorage.getItem("game_savedeth") != "true") {
        return false;
    }
    $_$ = JSON.parse(localStorage.getItem("json_save"));
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
    setTimeout(function() { saveAs(saveFile, "speckcoin-incremental-save.json"); }, 1000);
}

function reset() {
    $_$ = dataObject;
}

function refresh() {
    for (let i = 1; i <= 5; i++) {
        document.getElementById("CBA" + i).innerText = Math.floor($_$["speckCoin"]["buildings"]["tier" + i]["owned"]);
        document.getElementById("CBC" + i).innerText = Math.floor($_$["speckCoin"]["buildings"]["tier" + i]["cost"]);
        document.getElementById("CBP" + i).innerText = $_$["speckCoin"]["buildings"]["tier" + i]["baseRate"] * Math.floor($_$["speckCoin"]["buildings"]["tier" + i]["owned"]) * $_$["speckCoin"]["buildings"]["tier" + i]["multiplier"];
    }
    document.getElementById("speckcoin-value").innerText = Math.floor($_$["speckCoin"]["owned"]);
}
