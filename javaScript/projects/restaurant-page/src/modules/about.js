export default function buildAbout() {
    console.log(`about.js running`);
    const aboutContainer = document.createElement('div');
    aboutContainer.id = 'about';

    const header = document.createElement('h1');
    const headerText = document.createTextNode('About');
    header.appendChild(headerText);
    aboutContainer.appendChild(header);
    
    aboutContainer.appendChild(aboutMain.render());
    aboutContainer.appendChild(aboutHistory.render());
    return aboutContainer;
}

const aboutMain = {
    render: function() {
        const text = 'Varius morbi enim nunc faucibus a pellentesque sit amet porttitor. Magna eget est lorem ipsum dolor sit. Arcu felis bibendum ut tristique et. Tempus imperdiet nulla malesuada pellentesque elit eget gravida cum. Viverra orci sagittis eu volutpat odio. Id nibh tortor id aliquet. Faucibus nisl tincidunt eget nullam. Egestas quis ipsum suspendisse ultrices. Suspendisse potenti nullam ac tortor vitae purus faucibus. Tincidunt eget nullam non nisi est sit.';
        const aboutMainWrapper = document.createElement('div');
        aboutMainWrapper.id = 'about';

        const aboutMainParagraph = document.createElement('p');
        const aboutMainParagraphText = document.createTextNode(text);
        aboutMainParagraph.appendChild(aboutMainParagraphText);
        aboutMainWrapper.appendChild(aboutMainParagraph);

        return aboutMainWrapper;
    }
}

const aboutHistory = {
    render: function() {
        const historyWrapper = document.createElement('div');
        historyWrapper.id = 'history';

        for (let key in this.history) {
            const historyContainer = document.createElement('div');
            const historyHeading = document.createElement('h3');
            const historyHeadingText = document.createTextNode(`${key}, ${this.history[key][0]}`);
            historyHeading.appendChild(historyHeadingText);

            const historyParagraph = document.createElement('p');
            const historyParagraphText = document.createTextNode(this.history[key][1]);
            historyParagraph.appendChild(historyParagraphText);

            historyContainer.appendChild(historyHeading);
            historyContainer.appendChild(historyParagraph);
            historyWrapper.appendChild(historyContainer);
        }

        return historyWrapper;
    },
    history: {
        2013: ['Twilight Strand', 'Coming from Ascalon, we strived to feed thousands of exiles with familiar dishes. We started cooking pizzas on a small food cart with a homemade pizza oven, and pulled our service across The Mud Flats.'],
        2014: ['Wetlands', 'Our first food truck hit the zone offering more food choices widely known to locals.'],
        2015: ['Sarn Encampment', 'Our open-concept restaurant opened up to the undead, Blackguard soliders and passing exiles.'],
    },
}