import {IMarquee} from "../interface/IMarquee";

export class Marquee {

    private element: HTMLElement;
    private container: HTMLElement;
    private currentPosition: number;
    private isPaused: boolean;

    constructor(config: IMarquee) {
        this.element = config.element;
        this.container = config.container;
        this.currentPosition = 0;
        this.fillWidth();
        this.addEventListeners();
        setInterval(() => this.scroll(), 16);
    }

    addEventListeners() {
        this.container.addEventListener('mouseover', this.pause.bind(this))
        this.container.addEventListener('mouseleave', this.resume.bind(this))
        window.addEventListener('resize', this.fillWidth.bind(this))
    }


    fillWidth() {
        const containerWidth = this.container.offsetWidth;
        let elementWidth = this.element.offsetWidth;

        while (elementWidth < containerWidth * 2) {
            const clonedElement = this.element.cloneNode(true);
            this.container.appendChild(clonedElement);
            elementWidth += this.element.offsetWidth;
        }
        console.log('filled');
    }

    scroll() {
        if (this.isPaused) return;

        this.currentPosition -= 2;


        if (this.currentPosition < -this.element.offsetWidth) {
            this.currentPosition = 0;
        }

        this.container.style.transform = `translateX(${this.currentPosition}px)`;
    }

    pause() {
        this.isPaused = true; // Set the pause flag to true
    }

    resume() {
        this.isPaused = false; // Set the pause flag to false
    }
}
