export class PageAnimation {
    private element: HTMLElement;

    constructor(element: HTMLElement) {
        this.element = element;
        this.addEventListeners();
    }

    addEventListeners() {
        this.element.addEventListener('click', (e) => {
            e.preventDefault();
            this.element.classList.add('on-click');
        })
    }

}
