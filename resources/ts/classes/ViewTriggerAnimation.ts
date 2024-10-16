const DEFAULT_CLASS = 'in-view';
const DEFAULT_ROOT_MARGIN = 0;
const DEFAULT_THRESHOLD = [0, 0.1, 1];

interface ViewTriggerAnimationConfig {
    class?: string;
    rootMargin?: number;
    threshold?: Array<number>;
}

export class ViewTriggerAnimation {
    private class: string;
    private rootMargin: number;
    private threshold: Array<number>;
    private observer: IntersectionObserver;
    private elements: Array<HTMLElement>;

    constructor(elements, config: ViewTriggerAnimationConfig) {
        this.elements = elements;
        this.class = config.class || DEFAULT_CLASS;
        this.rootMargin = config.rootMargin || DEFAULT_ROOT_MARGIN;
        this.threshold = config.threshold || DEFAULT_THRESHOLD;
        this.createObserver();
        this.observeElements();
    }

    createObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(this.class);
                }
            })
        }, {
            rootMargin: `${this.rootMargin}px`,
            threshold: this.threshold,
        })
    }

    observeElements() {
        this.elements.forEach((element) => {
            this.observer.observe(element);
        })
    }
}
