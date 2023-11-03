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
    // resolve('meow');
    if (foo === 'meow') {
      resolve(foo);
    } else {
      reject(foo);
    }
  });
}

meowPromise('meow')
  .then((message) => {
    console.log(message);
    return message;
  })
  .then((message) => {
    console.log(`${message} ${message}`);
  })
  .catch((err) => {
    console.log(`error: ${err}`);
  });
