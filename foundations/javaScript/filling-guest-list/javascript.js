// Coded by Michael Recitis on 7 MAR 2023
// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Looping_code#active_learning_filling_in_a_guest_list

const people = ['Chris', 'Anne', 'Colin', 'Terri', 'Phil', 'Lola', 'Sam', 'Kay', 'Bruce'];
const admitted = document.querySelector('.admitted');
const refused = document.querySelector('.refused');
admitted.textContent = 'Admit: ';
refused.textContent = 'Refuse: ';

for (const person of people) {
    console.log(person);
    if (person === 'Phil' || person ===  'Lola') {
        refused.textContent += person + `, `;
    } else {
        admitted.textContent += person + `, `;
    }
}

refused.textContent = refused.textContent.slice(0, refused.textContent.length - 2) + '.';
admitted.textContent = admitted.textContent.slice(0, admitted.textContent.length - 2) + '.';