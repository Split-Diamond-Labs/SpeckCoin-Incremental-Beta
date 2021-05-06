// CORE FUNCTIONS

function notify(text) {
  alert(text);
}
function hideById(id) {
  document.getElementById(id).style.display = "none";
}
function showById(id) {
  document.getElementById(id).style.display = "block";
}
function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function romanize(num) {
  var lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},roman = '',i;
  for ( i in lookup ) {
    while ( num >= lookup[i] ) {
      roman += i;
      num -= lookup[i];
    }
  }
  return roman;
}

function saveGame() {
  localStorage.setItem("local_game_saved",true)
}

function loadGame() {
  if (localStorage.getItem("local_game_saved") != "true") {
    console.log("No save was found, starting new game...")
    return
  }

}

export { notify, hideById, showById, randomElement, romanize, saveGame, loadGame };
