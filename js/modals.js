var options = document.getElementById("options");

// Get the button that opens the modal
var optionsButton = document.getElementById("optionsButton");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
optionsButton.onclick = function() {
    options.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    options.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == options) {
        options.style.display = "none";
    }
}
document.getElementById("importSave").addEventListener("change", importSave, false);
document.getElementById("exportSave").addEventListener("click", exportSave, false);