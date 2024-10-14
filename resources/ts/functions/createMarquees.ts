import {Marquee} from "../classes/Marquee";

export function createMarquees() {
    document.querySelectorAll('[data-marquee]').forEach((e : HTMLElement) => {
        if (e.children.length > 1) {
            return console.error('Your marquee container can only have one child');
        }
        new Marquee({
            container: e,
            element: e.children[0] as HTMLElement,
        })
    })
}
