import {ViewTriggerAnimation} from "./ViewTriggerAnimation";

const DEFAULT_SPEED = 1;
const DEFAULT_DIRECTION = 'left';
const DEFAULT_WIDTH_FACTOR = 2;
const DEFAULT_SKEW = '20deg'
const DEFAULT_SCROLL_IN_SPEED = 15;

/**
 * Configuration interface for the Marquee class.
 * @interface MarqueeConfig
 */
interface MarqueeConfig {
    /** The speed of the marquee scroll. Default is 1. */
    speed?: number; // Default: 1
    /** The direction of the scroll, either 'left' or 'right'. Default is 'left'. */
    direction?: string; // Default: 'left'
    /** The width factor to determine how many times the element should repeat in the container. Default is 3. */
    widthFactor?: number; // Default: 3
    skew?: string;
    scrollInSpeed?: number;
}

/**
 * Class that creates a marquee effect for a given HTML element within a specified container.
 * @class Marquee
 */
export class Marquee {
    private elements: Array<HTMLElement>;
    private _direction: string;
    private readonly element: HTMLElement;
    private container: HTMLElement;
    private currentPosition: number;
    private isPaused: boolean;
    private speed: number;
    private readonly widthFactor: number;
    private skew: string;
    private scrollInSpeed: number;

    /**
     * Gets the direction of the scrolling.
     * @returns {string} The current scrolling direction.
     */
    get direction(): string {
        return this._direction;
    }

    /**
     * Sets the direction of the marquee scrolling.
     * @param {string} value - The direction ('left' or 'right') to set for scrolling.
     */
    set direction(value: string) {
        this._direction = value;
    }

    /**
     * Creates an instance of the Marquee class.
     * @param {HTMLElement} container - The container element for the marquee.
     * @param {HTMLElement} element - The HTML element to be scrolled.
     * @param {MarqueeConfig} config - Configuration options for the marquee effect.
     */
    constructor(container: HTMLElement, element: HTMLElement, config: MarqueeConfig) {
        this.element = element;
        this.elements = [element];
        this.container = container;
        this.speed = config.speed || DEFAULT_SPEED;
        this._direction = config.direction || DEFAULT_DIRECTION;
        this.widthFactor = config.widthFactor || DEFAULT_WIDTH_FACTOR;
        this.skew = config.skew || DEFAULT_SKEW;
        this.scrollInSpeed = config.scrollInSpeed || DEFAULT_SCROLL_IN_SPEED;
        this.reset();
        this.fillWidth();
        this.addEventListeners();
        setInterval(() => this.scroll(), 16);
    }

    /**
     * Adds event listeners for mouse events and window resize.
     */
    addEventListeners() {
        this.container.addEventListener('mouseover', this.pause.bind(this));
        this.container.addEventListener('mouseleave', this.resume.bind(this));
        new ViewTriggerAnimation([this.element], {
            callback: this.scrollIn.bind(this),
        })
        window.addEventListener('resize', this.fillWidth.bind(this));
    }

    /**
     * Fills the container with cloned elements until the width factor is met.
     */
    fillWidth() {
        const containerWidth = this.container.offsetWidth;
        let elementWidth = this.element.offsetWidth;

        this.container.innerHTML = '';
        this.container.appendChild(this.element);

        while (elementWidth < containerWidth * this.widthFactor) {
            const clonedElement = this.element.cloneNode(true);
            this.container.appendChild(clonedElement);
            elementWidth += this.element.offsetWidth;
            this.elements.push(clonedElement as HTMLElement);
        }
    }

    scrollIn() {
        const duration = 1000;
        const startSpeed = this.speed;
        const endSpeed = this.speed * this.scrollInSpeed;
        const startTime = performance.now();
        if (this.direction === 'left') {
            this.currentPosition = this.container.offsetWidth;
        }

        if (this.direction === 'right') {
            this.currentPosition = -this.container.offsetWidth * this.widthFactor;
        }

        const easeInQuad = (t: number) => t * t;

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            this.speed = startSpeed + (endSpeed - startSpeed) * easeInQuad(progress);
            if (this.direction === 'left') {
                this.elements.forEach((e) => {
                    e.style.transform = `skew(${this.skew})`;
                })
            }

            if (this.direction === 'right') {
                this.elements.forEach((e) => {
                    e.style.transform = `skew(-${this.skew})`;
                })
            }

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setTimeout(() => {
                    this.speed = startSpeed;
                    this.elements.forEach((e) => {
                        e.style.transform = 'skew(0)';
                    });
                }, 1000);
            }
        };

        requestAnimationFrame(animate); // Start the animation
    }

    /**
     * Scrolls the marquee in the specified direction.
     */
    scroll() {
        if (this.isPaused) return;

        if (this._direction === 'left') {
            this.currentPosition -= this.speed;
            if (this.currentPosition <= -this.element.offsetWidth) {
                this.reset();
            }
        }

        if (this._direction === 'right') {
            this.currentPosition += this.speed;
            if (this.currentPosition >= 0) {
                this.reset();
            }
        }

        this.container.style.transform = `translateX(${this.currentPosition}px)`;
    }

    /**
     * Pauses the marquee scrolling.
     */
    pause() {
        this.isPaused = true;
    }

    /**
     * Resumes the marquee scrolling.
     */
    resume() {
        this.isPaused = false;
    }

    /**
     * Resets the current position based on the direction.
     */
    reset() {
        if (this._direction === 'left') {
            this.currentPosition = 0;
        }
        if (this._direction === 'right') {
            this.currentPosition = -this.element.offsetWidth;
        }
    }

}
