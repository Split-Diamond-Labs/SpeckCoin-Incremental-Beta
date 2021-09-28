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
    skipLore()
}

function skipLore() {
    showById("gameplay");
    hideById("loader");
}

if (url.searchParams.get("devMode")) {
    setTimeout(() => { document.write("<h1 style='font-family: \"Segoe UI\"; font-size: 500%;'>DevMode does not exist, sorry for the inconvenience.</h1>") }, 1);
}

let images = document.getElementsByTagName('IMG');

for (let i = 0; i < images.length; i++) {
    images[i].ondragstart = function() { return false; };
}

window.addEventListener("beforeunload", function(e) { saveGame($_$); });