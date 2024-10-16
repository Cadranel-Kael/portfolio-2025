const DEFAULT_SIZE = 20;
const DEFAULT_TRAIL_SIZE = 20;
const DEFAULT_HOVER_SIZE_MULTIPLIER = 1.5;
const DEFAULT_TRAIL_DECAY_FACTOR = 0.85;
const DEFAULT_TRAIL_SPEED = 0.1;

/**
 * Configuration interface for the Mouse class.
 * @interface MouseConfig
 */
interface MouseConfig {
    /** The size of the mouse cursor. */
    size?: number; // Default: DEFAULT_SIZE
    /** The number of trail points to display. */
    trailSize?: number; // Default: DEFAULT_TRAIL_SIZE
    /** Multiplier for the hover size when hovering over clickable elements. */
    hoverSizeMultiplier?: number; // Default: DEFAULT_HOVER_SIZE_MULTIPLIER
    /** The decay factor for the size of the trails. */
    trailDecayFactor?: number; // Default: DEFAULT_TRAIL_DECAY_FACTOR
    /** The speed at which the trails move towards the cursor. */
    trailSpeed?: number; // Default: DEFAULT_TRAIL_SPEED
}

/**
 * Class that represents a custom mouse cursor with a trailing effect.
 * @class Mouse
 */
export class Mouse {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private mouseX: number;
    private mouseY: number;
    private size: number;
    private readonly defaultSize: number;
    private readonly hoverSize: number;
    private trailShapes: any[];
    private readonly trailSize: number;
    private readonly trailDecayFactor: number;
    private readonly trailSpeed: number;

    /**
     * Creates an instance of the Mouse class.
     * @param {HTMLCanvasElement} canvas - The canvas element where the mouse effect will be drawn.
     * @param {MouseConfig} config - Configuration options for the mouse effect.
     */
    constructor(canvas: HTMLCanvasElement, config: MouseConfig) {
        this.canvas = canvas;
        this.size = config.size || DEFAULT_SIZE;
        this.defaultSize = this.size;
        this.hoverSize = this.size * (config.hoverSizeMultiplier || DEFAULT_HOVER_SIZE_MULTIPLIER);
        this.trailSize = config.trailSize || DEFAULT_TRAIL_SIZE;
        this.trailDecayFactor = config.trailDecayFactor || DEFAULT_TRAIL_DECAY_FACTOR;
        this.trailSpeed = config.trailSpeed || DEFAULT_TRAIL_SPEED;
        this.ctx = canvas.getContext("2d");
        this.trailShapes = [];
        this.fillScreen();
        this.draw();
        this.addEventListeners();
        requestAnimationFrame(this.animate.bind(this));
    }

    /**
     * Adds event listeners for mouse movement and window resizing.
     */
    addEventListeners() {
        window.addEventListener('mousemove', (e) => {
            this.mouseX = e.x;
            this.mouseY = e.y;
            this.checkHoverState(e);
            this.addShapeToTrail();
        });

        window.addEventListener('resize', this.fillScreen.bind(this));
    }

    /**
     * Fills the canvas to match the full window size anf scales it depending on the device.
     */
    fillScreen() {
        this.canvas.style.width = `${window.innerWidth}px`;
        this.canvas.style.height = `${window.innerHeight}px`;
        const scale = window.devicePixelRatio;
        this.canvas.width = window.innerWidth * scale;
        this.canvas.height = window.innerHeight * scale;
        this.ctx.scale(scale, scale);
    }

    /**
     * Clears the entire canvas.
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    /**
     * Adds a new shape to the trail based on the current mouse position.
     */
    addShapeToTrail() {
        // Add a new shape with initial position and size to the trail
        this.trailShapes.push({x: this.mouseX, y: this.mouseY, size: this.defaultSize});
        if (this.trailShapes.length > this.trailSize) {
            this.trailShapes.shift(); // Limit trail size
        }
    }

    /**
     * Draws the mouse cursor and its trails on the canvas.
     */
    draw() {
        this.clearCanvas();

        this.ctx.fillStyle = "#fff";
        this.ctx.beginPath();
        this.ctx.arc(this.mouseX, this.mouseY, this.size, 0, 2 * Math.PI);
        this.ctx.fill();

        this.trailShapes.forEach((trail) => {
            trail.x += (this.mouseX - trail.x) * this.trailSpeed;
            trail.y += (this.mouseY - trail.y) * this.trailSpeed;

            const sizeDecayFactor = this.trailDecayFactor;
            trail.size *= sizeDecayFactor;

            this.ctx.beginPath();
            this.ctx.arc(trail.x, trail.y, trail.size, 0, 2 * Math.PI);
            this.ctx.fill();
        });
    }

    /**
     * Checks if the cursor is hovering over a clickable element.
     * @param {MouseEvent} e - The mouse event containing the position of the cursor.
     */
    checkHoverState(e: MouseEvent) {
        const element = document.elementFromPoint(e.clientX, e.clientY);

        if (element && (element.tagName === 'A' || element.tagName === 'BUTTON' || getComputedStyle(element).cursor === 'pointer')) {
            this.size = this.hoverSize;
        } else {
            this.size = this.defaultSize;
        }
    }

    /**
     * Initiates the animation loop to continuously draw the mouse cursor and trails.
     */
    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}
