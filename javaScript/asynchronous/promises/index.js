const userLeft = false;
const userWatchingCatMeme = false;

function watchTutorialPromise() {
  // return new Promise((resolve, reject) => {
  if (userLeft) {
    return Promise.reject({
      name: 'User left',
      message: 'Darn',
    });
  } else if (userWatchingCatMeme) {
    return Promise.reject({
      name: 'User watching cat meme',
      message: 'User likes cats',
    });
  } else {
    return Promise.resolve('Thumbs up and susbscribe');
  }
  // });
}

watchTutorialPromise()
  .then((message) => {
    console.log('Success: ' + message);
  })
  .catch((error) => {
    console.log(error.name + ' ' + error.message);
  });

// testing...

function meowPromise(foo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (foo === 'meow') {
        resolve(foo);
      } else {
        reject(foo);
      }
    }, 5000);
  });
}

let bar;

setTimeout(() => {
  bar = 'meow';
}, 5000);

setTimeout(() => {
  meowPromise(bar)
    .then((message) => {
      console.log(message);
      return message;
    })
    .then((message) => {
      console.log(`${message} ${message}`);
      return 'From second then';
    })
    .then((message) => {
      console.log(message);
      console.log('Third then running');
    })
    .catch((err) => {
      console.log(`error: ${err}`);
    });
}, 1000);

// const promise = fetch('./data/cats.json', { mode: 'cors' })
//   .then((resp) => resp.json())
// // .then(getCats)
// // .catch(handleError);

// // function getCats(data) {
// //   console.log(data);
// // }

// // function handleError(err) {
// //   console.log(err);
// }
