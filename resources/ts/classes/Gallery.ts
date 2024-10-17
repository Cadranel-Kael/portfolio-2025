const DEFAULT_PREVIOUS_TAG = '[data-previous]';
const DEFAULT_NEXT_TAG = '[data-next]';
const DEFAULT_IMAGES_TAG = '[data-image]';

interface GalleryConfig {
    previousTag?: string;
    nextTag?: string;
    imageTag?: string;
}

export class Gallery {
    private gallery: HTMLElement;
    private previous: Element;
    private next: Element;
    private images: NodeListOf<HTMLElement>;
    private index: number;

    constructor(gallery: HTMLElement, config: GalleryConfig) {
        this.gallery = gallery;
        this.previous = gallery.querySelector(config.previousTag || DEFAULT_PREVIOUS_TAG);
        this.next = gallery.querySelector(config.nextTag || DEFAULT_NEXT_TAG);
        this.images = gallery.querySelectorAll(config.imageTag || DEFAULT_IMAGES_TAG);
        this.index = 0;
        this.addEventListeners();
        this.images[0].style.transform = `translateX(-${this.gallery})`;
    }

    addEventListeners() {
        this.next.addEventListener('click', this.nextImage.bind(this));
        this.previous.addEventListener('click', this.previousImage.bind(this));
    }

    nextImage() {
        this.index++;
        if (this.index >= this.images.length) {
            this.index = 0;
        }
        this.images.forEach((image) => {
            image.style.transform = `translateX(-${100 * this.index}vw)`;
        })
    }

    previousImage() {
        this.index--;
        if (this.index < 0) {
            this.index = this.images.length - 1;
        }
        this.images.forEach((image) => {
            image.style.transform = `translateX(-${100 * this.index}vw)`;
        })
    }

}
