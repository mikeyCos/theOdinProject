import { pubSub } from '../containers/pubsub';

export default function buildOverlay() {
    return overlay.render();
}

const overlay = {
    cacheDOM: function(container) {
        this.overlay = container;
    },
    render: function() {
        const overlay = document.createElement('div');
        overlay.classList.add('overlay_main_content');
        this.cacheDOM(overlay);
        this.bindEvents();

        return overlay;
    },
    bindEvents: function() {
        this.dimOverlay = this.dimOverlay.bind(this);
        pubSub.subscribe('dim', overlay.dimOverlay);
    
    },
    dimOverlay: function(e) {
        if (e.classList.contains('hide') || window.innerWidth > 768) {
            this.overlay.classList.remove('dim');
        } else if (!e.classList.contains('hide')) {
            this.overlay.classList.add('dim');
        }
    },
}