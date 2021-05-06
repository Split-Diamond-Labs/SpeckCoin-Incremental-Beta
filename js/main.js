class Core {
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
    localStorage.setItem("local_game_saved",true);
  }

  function loadGame() {
    if (localStorage.getItem("local_game_saved") != "true") {
      console.log("No save was found, starting new game...");
      return false;
    }
    return true;
  }
}

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
  console.log("Update");
  if (timePassed < 120) {
    Core.showById("loader");
    Core.hideById("pageContent");
  } else {
    Core.hideById("loader");
    Core.showById("pageContent");
  }
  
}), 25);
if (loadGame()) {
  console.log("Save found!");
}

