const MOUNTAINS = [
    {name: "Kilimanjaro", height: 5895, place: "Tanzania"},
    {name: "Everest", height: 8848, place: "Nepal"},
    {name: "Mount Fuji", height: 3776, place: "Japan"},
    {name: "Vaalserber", height: 323, place: "Netherlands"},
    {name: "Denali", height: 6168, place: "United States"},
    {name: "Popocatepetl", height: 5465, place: "Mexico"},
    {name: "Mont Blanc", height: 4808, place: "Italy/France"}
];

let headerData = Object.keys(MOUNTAINS[0]);
const container = document.querySelector('#mountains');
const table = document.createElement('table');
container.appendChild(table);

function createTableHeader(table, headerData) {
    let header = table.createTHead();
    let row = header.insertRow();
    for (let key of headerData) {
        let headerTag = document.createElement('th');
        let headerTagText = document.createTextNode(key);
        headerTag.appendChild(headerTagText);
        row.appendChild(headerTag);
    }
}

function createTable(table, arr) {
    for (let mountain of arr) {
        let row = table.insertRow();
        for (key in mountain) {
            let cell = row.insertCell();
            let text = document.createTextNode(mountain[key]);
            cell.appendChild(text);
            if (typeof mountain[key] === typeof 1) {
                cell.setAttribute('style','text-align: right; padding: 0 5em;');
            }
        }
    }
}

createTable(table, MOUNTAINS);
createTableHeader(table, headerData);