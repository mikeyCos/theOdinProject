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
        // this.watchScreen = this.watchScreen.bind(this);
        // window.addEventListener('resize', this.watchScreen)
        pubSub.subscribe('dim', overlay.dimOverlay);
    
    },
    unbindEvents: function() {
        // pubSub.unsubscribe('dim', overlay.dimOverlay);
    },
    dimOverlay: function(e) {
        if (e.classList.contains('hide') || window.innerWidth > 768) {
            this.overlay.classList.remove('dim');
        } else if (!e.classList.contains('hide')) {
            this.overlay.classList.add('dim');
        }
    },
    // watchScreen: function() {
    //     console.log(window.innerWidth);
    //     // this.getWindowWidth = this.getWindowWidth.bind(this);
    // },
}