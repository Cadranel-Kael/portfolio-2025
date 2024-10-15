const DEFAULT_ANGLE = '15deg';
const DEFAULT_TRANSITION_TIME = '0.3s';
const DEFAULT_TRANSITION_TIMING_FUNCTION = 'ease-in-out';

/**
 * Configuration interface for the Skew class.
 * @interface SkewConfig
 */
interface SkewConfig {
    /** The angle of skew to apply on scroll. Default is '15deg'. */
    angle?: string; // Default: '15deg'
    /** The transition time for the skew effect. Default is '0.3s'. */
    transitionTime?: string; // Default: '0.3s'
    /** The timing function for the transition. Default is 'ease-in-out'. */
    transitionTimingFunction?: string; // Default: 'ease-in-out'
}

/**
 * Class that applies a skew effect to an HTML element based on scroll direction.
 * @class Skew
 */
export class Skew {
    private element: HTMLElement;
    private readonly angle: string;
    private timer: any;
    private oldScroll: number;

    /**
     * Creates an instance of the Skew class.
     * @param {HTMLElement} element - The HTML element to be skewed on scroll.
     * @param {SkewConfig} config - Configuration options for the skew effect.
     */
    constructor(element: HTMLElement, config: SkewConfig) {
        this.element = element;
        this.angle = config.angle || DEFAULT_ANGLE;
        this.element.style.display = 'inline-block';
        this.element.style.transition = `${config.transitionTime || DEFAULT_TRANSITION_TIME} ${config.transitionTimingFunction || DEFAULT_TRANSITION_TIMING_FUNCTION} all`;
        this.timer = null;
        this.oldScroll = 0;
        this.addEventListeners();
    }

    /**
     * Adds scroll event listeners to the window.
     */
    addEventListeners() {
        window.addEventListener('scroll', this.start.bind(this), false)
    }

    /**
     * Starts the skew effect based on scroll direction.
     * If scrolling up, applies the skew angle. If scrolling down, applies the negative skew angle.
     */
    start() {
        if (this.oldScroll > window.scrollY) {
            this.skew(this.angle);
        } else {
            this.skew(`-${this.angle}`);
        }

        this.oldScroll = window.scrollY;

        if (this.timer !== null) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(this.stop.bind(this), 150);
    }

    /**
     * Applies the skew transformation to the element.
     * @param {string} angle - The angle of skew to apply.
     */
    skew(angle: string) {
        this.element.style.transform = `skew(${angle})`;
    }

    /**
     * Resets the skew transformation to zero.
     */
    stop() {
        this.element.style.transform = `skew(0)`;
    }

}
