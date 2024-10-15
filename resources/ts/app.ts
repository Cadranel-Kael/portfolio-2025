import {BurgerMenu} from "./classes/BurgerMenu";
import {createMarquees} from "./functions/createMarquees";
import {createAccordions} from "./functions/createAccordions";
import {Mouse} from "./classes/Mouse";

document.addEventListener('DOMContentLoaded', function() {
    const noJs = document.querySelectorAll('.no-js');
    noJs.forEach((e) => e.remove())
    new BurgerMenu(document.querySelector('#mainMenu'), document.querySelector('#mainMenuButton'));
    createMarquees();
    createAccordions();
    new Mouse(document.querySelector('#canvas'), {
    });
});
