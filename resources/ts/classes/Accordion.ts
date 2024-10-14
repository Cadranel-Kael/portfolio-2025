export class Accordion {
    private clickable: HTMLElement;
    private collapsible: HTMLElement;
    private isExpanded: boolean;

    constructor(clickable: HTMLElement, collapsible: HTMLElement) {
        this.clickable = clickable;
        this.collapsible = collapsible;
        this.close();
        this.addEventListeners();
    }

    toggle() {
        if (this.isExpanded) {
            this.close();
        } else {
            this.expand();
        }
    }

    addEventListeners() {
        this.clickable.addEventListener('click', this.toggle.bind(this))
    }

    close() {
        this.collapsible.classList.add('hidden')
        this.collapsible.ariaExpanded = 'false';
        this.isExpanded = false;
    }

    expand() {
        this.collapsible.classList.remove('hidden')
        this.collapsible.ariaExpanded = 'true';
        this.isExpanded = true;
    }

}
