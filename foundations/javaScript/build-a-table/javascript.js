const MOUNTAINS = [
    {name: "Kilimanjaro", height: 5895, place: "Tanzania"},
    {name: "Everest", height: 8848, place: "Nepal"},
    {name: "Mount Fuji", height: 3776, place: "Japan"},
    {name: "Vaalserber", height: 323, place: "Netherlands"},
    {name: "Denali", height: 6168, place: "United States"},
    {name: "Popocatepetl", height: 5465, place: "Mexico"},
    {name: "Mont Blanc", height: 4808, place: "Italy/France"}
];

const container = document.querySelector('#mountains');
const table = document.createElement('table');
container.appendChild(table);

for (i = 0; i < MOUNTAINS.length; i++) {
    const row = document.createElement('tr');
    table.appendChild(row);
    for (j = 0; j < 3; j++) {
        const cells = document.createElement('td');
        row.appendChild(cells);
        if (j == 0) {
            cells.textContent = MOUNTAINS[i].name;
        } else if (j == 1) {
            cells.textContent = MOUNTAINS[i].height;
            cells.setAttribute('style', 'text-align: right; width: 5em;');
        } else if (j == 2) {
            cells.textContent = MOUNTAINS[i].place;
            cells.setAttribute('style', 'text-align: right; width: 10em;');
        }
    }
}


// MOUNTAINS.forEach(element => {
//     console.log(element.name);
// });

// MOUNTAINS.forEach(element => {
//     console.log(element.height);
// });

// MOUNTAINS.forEach(element => {
//     console.log(element.place);
// });