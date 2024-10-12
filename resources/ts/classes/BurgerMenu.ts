export class BurgerMenu {
    menu: HTMLElement;
    button: HTMLElement;
    isOpen: boolean;

    constructor(menu: HTMLElement, button:HTMLElement) {
        this.menu = menu;
        this.button = button;
        this.close();
        this.addEventListeners();

    }

    addEventListeners() {
        this.button.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggle();
        })
    }

    open() {
        this.menu.classList.remove('closed');
        this.button.classList.add('closed');
        this.menu.ariaExpanded = 'true';
        this.isOpen = true;
    }

    close() {
        this.menu.classList.add('closed');
        this.button.classList.remove('closed');
        this.menu.ariaExpanded = 'false';
        this.isOpen = false;
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }
}
