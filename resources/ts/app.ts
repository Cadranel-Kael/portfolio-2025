import {BurgerMenu} from "./classes/BurgerMenu";
import {createMarquees} from "./functions/createMarquees";
import {createAccordions} from "./functions/createAccordions";
import {Skew} from "./classes/Skew";
import {Mouse} from "./classes/Mouse";

document.addEventListener('DOMContentLoaded', function() {
    const noJs = document.querySelectorAll('.no-js');
    noJs.forEach((e) => e.remove())
    new BurgerMenu(document.querySelector('#mainMenu'), document.querySelector('#mainMenuButton'));
    createMarquees();
    createAccordions();
    document.querySelectorAll('[data-skew]').forEach((e) => {
        new Skew(e as HTMLElement, {});
    })
    new Mouse(document.querySelector('#canvas'), {});
});
