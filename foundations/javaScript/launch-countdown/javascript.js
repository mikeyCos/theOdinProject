// Coded by Michael Recitis on 7 MAR 2023
// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Looping_code#active_learning_launch_countdown

let output = document.querySelector('.output');
output.innerHTML = '';

// Countdown from 10 to 0
for(i = 10; i >= 0; i-- ) {
    const para = document.createElement('p');
    if (i === 10) { 
        output.appendChild(para);
        para.textContent = `Coundown 10`;
    } else if (i === 0) {
        output.appendChild(para);
        para.textContent = `Blast off!`;
    } else {
        output.appendChild(para);
        para.textContent = `${i}`;
    }
}