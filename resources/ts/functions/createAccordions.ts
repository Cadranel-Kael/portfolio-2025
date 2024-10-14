import {Accordion} from "../classes/Accordion";

export function createAccordions() {
    document.querySelectorAll('[data-accordian]').forEach((e: HTMLElement) => {
        new Accordion(e, e.querySelector('[data-collapsible]'))
    })
}
