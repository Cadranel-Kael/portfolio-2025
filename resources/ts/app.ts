import {BurgerMenu} from "./classes/BurgerMenu";
import {createMarquees} from "./functions/createMarquees";
import {createAccordions} from "./functions/createAccordions";
import {Skew} from "./classes/Skew";
import {Mouse} from "./classes/Mouse";
import {observeElements} from "./functions/observeElements";
import {Parallax} from "./classes/Paralax";
import {PageAnimation} from "./classes/PageAnimation";

document.addEventListener('DOMContentLoaded', function() {
    const noJs = document.querySelectorAll('.no-js');
    noJs.forEach((e) => e.remove())
    new BurgerMenu(document.querySelector('#mainMenu'), document.querySelector('#mainMenuButton'));
    createMarquees();
    createAccordions();
    document.querySelectorAll('[data-skew]').forEach((e) => {
        new Skew(e as HTMLElement, {});
    });
    if(window.matchMedia(("(hover: hover)")).matches) {
        new Mouse(document.querySelector('#canvas'), {});
    }
    observeElements();
    document.querySelectorAll('[data-parallax]').forEach((e) => {
        const element = e as HTMLElement;
        new Parallax(element, {speed: parseInt(element.dataset.parallax) });
    });
});
