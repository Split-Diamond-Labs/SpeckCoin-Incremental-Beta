function changeStuff() {
    document.getElementById("lore-text").innerText = lore[++loreIndex];
}
if (false /* localStorage.getItem("game_savedeth") */ ) {
    showById("gameplay");
    hideById("loader")
} else {
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
}

document.getElementById('game-icon').ondragstart = function() { return false; };

window.addEventListener("beforeunload", function(e) { saveGame($_$); });