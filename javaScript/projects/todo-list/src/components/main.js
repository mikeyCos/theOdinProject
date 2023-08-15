//builds #main_content
//should change based on selected project
export default function buildMain(content) {
    const mainWrapper = document.createElement('div');
    mainWrapper.id = 'main_content';

    // mainWrapper.appendChild(main.render());
    content.appendChild(mainWrapper);
}

const main = {
    cacheDOM: function() {

    },
    bindEvents: function() {

    },
    switchContent: function() {
        
    },
    setActiveContent: function() {

    },
    render: function() {
        let content;
        
    }
}