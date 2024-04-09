const element = document.querySelector('.paragraph > p');
element.addEventListener('animationstart', listener, false);
element.addEventListener('animationend', listener, false);
element.addEventListener('animationiteration', listener, false);

element.classList.add('slideInLeft');

function listener(e) {
  const liElement = document.createElement('li');
  switch (e.type) {
    case 'animationstart':
      liElement.textContent = `Started: elapsed time is ${e.elapsedTime}`;
      break;
    case 'animationend':
      liElement.textContent = `Ended: elapsed time is ${e.elapsedTime}`;
      break;
    case 'animationiteration':
      liElement.textContent = `New loop started at time ${e.elapsedTime}`;
      break;
  }

  document.querySelector('.output').appendChild(liElement);
}
