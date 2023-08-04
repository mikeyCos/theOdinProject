import '../styles/home.css';

export default function buildHome() {
    console.log('buildHome running');
    const homeContainer = document.createElement('div');
    homeContainer.id = 'home';

    const header = document.createElement('h1');
    const headerText = document.createTextNode('Still sane?');
    header.appendChild(headerText);
    
    homeContainer.appendChild(header);
    homeContainer.appendChild(statement.render());
    homeContainer.appendChild(openHours.render());
    homeContainer.appendChild(location.render());
    return homeContainer;
}

//mission/welcome statement
const statement = {
    render: function() {
        const statementWrapper = document.createElement('div');
        statementWrapper.id = 'statement';

        const statementContainer = document.createElement('div');
        statementContainer.classList.add('container');

        const statementHeader = document.createElement('h2');
        const statementHeaderText = document.createTextNode('Placeholder');
        statementHeader.appendChild(statementHeaderText);

        const statementParagraph = document.createElement('p');
        const statementParagraphText = document.createTextNode('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id nibh tortor id aliquet lectus proin. Enim diam vulputate ut pharetra sit amet. Vel turpis nunc eget lorem.');
        statementParagraph.appendChild(statementParagraphText);

        statementContainer.appendChild(statementHeader);
        statementContainer.appendChild(statementParagraph);
        statementWrapper.appendChild(statementContainer);

        return statementWrapper;
    },
}

//hours of operation
const openHours = {
    hours: {
        Monday: '9AM - 9PM',
        Tuesday: '9AM - 9PM',
        Wednesday: '9AM - 9PM',
        Thursday: '9AM - 9PM',
        Friday: '9AM - 9PM',
        Saturday: '10AM - 10PM',
        Sunday: 'Closed'
    },
    render: function() {
        const hoursWrapper = document.createElement('div');
        hoursWrapper.id = 'hours';

        const hoursContainer = document.createElement('div');
        hoursContainer.classList.add('container');

        const hoursHeader = document.createElement('h2');
        const hoursHeaderText = document.createTextNode('Hours');
        hoursHeader.appendChild(hoursHeaderText);

        const hoursList = document.createElement('ul');
        for (let key in this.hours) {
            let day = document.createElement('li');
            let dayText = document.createTextNode(key);
            day.appendChild(dayText);
            hoursList.appendChild(day);

            let hours = document.createElement('li');
            let hoursText = document.createTextNode(this.hours[key]);
            hours.appendChild(hoursText);
            hoursList.appendChild(hours);
        }

        hoursWrapper.appendChild(hoursContainer);
        hoursContainer.appendChild(hoursHeader);
        hoursContainer.appendChild(hoursList);
        return hoursWrapper;
    }
}

//location
const location = {
    render: function() {
        const locationWrapper = document.createElement('div');
        locationWrapper.id = 'location';

        const locationContainer = document.createElement('div');
        locationContainer.classList.add('container');

        const locationHeader = document.createElement('h2');
        const locationHeaderText = document.createTextNode('Address');
        locationHeader.appendChild(locationHeaderText);

        const locationParagraph = document.createElement('p');
        const locationParagraphText = document.createTextNode('1234 NW Placholder Rd. State, QQ 56789');
        locationParagraph.appendChild(locationParagraphText);
        locationContainer.appendChild(locationHeader);
        locationContainer.appendChild(locationParagraph);
        locationWrapper.appendChild(locationContainer);

        return locationWrapper;
    }
}