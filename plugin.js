'use strict';

class Tabs {
    constructor({ rootSelector, activeControlClass = 'active', activePaneClass = 'active', activeTab = 1,}) {
        this.refs = this.getRefs(rootSelector);
        this.activeControlClass = activeControlClass;
        this.activePaneClass = activePaneClass;
        this.activeTabIdx = activeTab - 1;

        this.bindEvents();
        this.setActiveTab();
    }

    getRefs(root) {
        const refs = {};
        refs.controls = document.querySelector(`${root} [data-controls]`);
        refs.panes = document.querySelector(`${root} [data-panes]`);

        return refs;
    }

    bindEvents() {
        this.refs.controls.addEventListener('click', this.onControlsClick.bind(this));
    }

    onControlsClick(event) {
        event.preventDefault();

        if (event.target.nodeName !== 'A') {
            return;
        }
        
        this.removeActiveTab();

        const controlItem = event.target;
        controlItem.classList.add(this.activeControlClass);
        
        const paneId = this.getPaneId(controlItem);
        this.setActivePane(paneId);
    }

    setActiveTab() {
        const controlItems = this.refs.controls.querySelectorAll('a');
        const control = controlItems[this.activeTabIdx];

        control.classList.add(this.activeControlClass);

        const paneId = this.getPaneId(control);
        this.setActivePane(paneId);
    }

    removeActiveTab() {
        const currentActiveControlItem = this.refs.controls.querySelector(`.${this.activeControlClass}`);

        if (!currentActiveControlItem) {
            return;
        }

            currentActiveControlItem.classList.remove(this.activeControlClass);

            const paneId = this.getPaneId(currentActiveControlItem);
            this.removeActivePane(paneId);
    }

    setActivePane(paneId) {
        const pane = this.getPaneById(paneId);
        pane.classList.add(this.activePaneClass);
        // console.log(pane)
    }

    removeActivePane(paneId) {
        const pane = this.getPaneById(paneId);
        pane.classList.remove(this.activePaneClass);
        // console.log(pane)
    }

    getPaneId(control) {
       return control.getAttribute('href').slice(1);
    }

    getPaneById(id) {
       return this.refs.panes.querySelector(`#${id}`);
    }
}

const tabs1 = new Tabs({
    rootSelector: '#tabs-1',
    activeControlClass: 'controls__item--active',
    activePaneClass: 'pane--active',
    activeTab: 2,
})

// console.log(tabs1);

const tabs2 = new Tabs({
    rootSelector: '#tabs-2',
    activeControlClass: 'controls__item--active',
    activePaneClass: 'pane--active',
    activeTab: 3,
})

// console.log(tabs2)