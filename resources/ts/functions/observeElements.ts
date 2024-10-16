import {ViewTriggerAnimation} from "../classes/ViewTriggerAnimation";

export function observeElements() {
    const elements = document.querySelectorAll('[data-observe]');
    new ViewTriggerAnimation(elements, {});
}
