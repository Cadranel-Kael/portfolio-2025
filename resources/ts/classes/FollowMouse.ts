export class FollowMouse {
    private element: HTMLElement;
    private factor: number;
    constructor(element: HTMLElement) {
        this.element = element
        this.factor = 0.02;
        this.addEventListeners();
    }

    addEventListeners() {
        window.addEventListener(('mousemove'), (e) => {
            this.element.style.translate = `${e.x * this.factor}px ${e.y * this.factor}px`
        })
    }
}
