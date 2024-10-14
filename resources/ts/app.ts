import {BurgerMenu} from "./classes/BurgerMenu";
import {createMarquees} from "./functions/createMarquees";
import {createAccordions} from "./functions/createAccordions";

document.addEventListener('DOMContentLoaded', function() {
    const noJs = document.querySelectorAll('.no-js');
    noJs.forEach((e) => e.remove())
    new BurgerMenu(document.querySelector('#mainMenu'), document.querySelector('#mainMenuButton'));
    createMarquees();
    createAccordions();
});
