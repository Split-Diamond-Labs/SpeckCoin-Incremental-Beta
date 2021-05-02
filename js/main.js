import { Core } from "./modules/coreFunctions.js";
let timePassed = 0;
function update() {
  timePassed++;
  if (timePassed < 120) {
    Core.showById("loader");
    Core.hideById("pageContent");
  } else {
    Core.hideById("loader");
    Core.showById("pageContent");
  }
}
