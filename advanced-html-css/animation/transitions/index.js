const hiddenDiv = document.querySelector('.content > .one > div');
const sectionOne = document.querySelector('.content > .one');

sectionOne.addEventListener('click', showHide);
// sectionOne.addEventListener('keydown', showHide);

function showHide() {
  hiddenDiv.classList.toggle('showing');
}

const ball = document.querySelector('.ball');

document.addEventListener('click', (e) => {
  ball.style.transform = `translateY(${e.clientY - 25}px)`;
  ball.style.transform += `translateX(${e.clientX - 25}px)`;
});
