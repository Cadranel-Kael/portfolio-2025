const DEFAULT_SPEED = 0.2;

interface ParallaxConfig {
    speed?: number;
}

export class Parallax {
    private element: HTMLElement;
    private scrollPosition: number;
    private readonly speed: number;

    constructor(element: HTMLElement, config: ParallaxConfig) {
        this.element = element;
        this.speed = config.speed || DEFAULT_SPEED;
        this.translate();
        this.addEventListeners();
    }

    addEventListeners() {
        window.addEventListener('scroll', this.translate.bind(this))
    }

    translate() {
        this.scrollPosition = window.scrollY;
        this.element.style.transform = `translateY(${this.scrollPosition * this.speed}px)`
    }
}
