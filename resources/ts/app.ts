import {BurgerMenu} from "./classes/BurgerMenu";
import {createMarquees} from "./functions/createMarquees";
import {createAccordions} from "./functions/createAccordions";
import {Skew} from "./classes/Skew";
import {Mouse} from "./classes/Mouse";
import {observeElements} from "./functions/observeElements";
import {Parallax} from "./classes/Parallax";
import {PageAnimation} from "./classes/PageAnimation";
import {FollowMouse} from "./classes/FollowMouse";
import {Gallery} from "./classes/Gallery";

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
    document.querySelectorAll('.planet').forEach((e) => {
        new FollowMouse(e as HTMLElement);
    })
    document.querySelectorAll('[data-gallery]').forEach((e) => {
        new Gallery(e as HTMLElement, {});
    })
});
