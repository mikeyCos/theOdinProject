// 1. Rewrite using async/await
// Rewrite this example code from the chapter Promises chaining using async/await instead of .then/catch:

// function loadJson(url) {
// return fetch(url)
// .then(response => {
// if (response.status == 200) {
// return response.json();
// } else {
// throw new Error(response.status);
// }
// });
// }
//
// loadJson('https://javascript.info/no-such-user.json')
// .catch(alert);

// ---------------------------------------------------
// --------------------MY SOLUTION--------------------
// async function loadJson(url) {
//   try {
//     const response = await fetch(url);

//     if (response.status == 200) {
//       return await response.json();
//     } else {
//       throw new Error(response.status);
//     }
//   } catch (err) {
//     alert(err);
//   }
// }

// loadJson('https://javascript.info/no-such-user.json');

// 2. Rewrite "rethrow" with async/await
// Below you can find the “rethrow” example. Rewrite it using async/await instead of .then/catch.
// And get rid of the recursion in favour of a loop in demoGithubUser: with async/await that becomes easy to do.

// class HttpError extends Error {
//   constructor(response) {
//     super(`${response.status} for ${response.url}`);
//     this.name = 'HttpError';
//     this.response = response;
//   }
// }

// function loadJson(url) {
//   return fetch(url)
//     .then(response => {
//       if (response.status == 200) {
//         return response.json();
//       } else {
//         throw new HttpError(response);
//       }
//     });
// }

// // Ask for a user name until github returns a valid user
// function demoGithubUser() {
//   let name = prompt("Enter a name?", "iliakan");

//   return loadJson(`https://api.github.com/users/${name}`)
//     .then(user => {
//       alert(`Full name: ${user.name}.`);
//       return user;
//     })
//     .catch(err => {
//       if (err instanceof HttpError && err.response.status == 404) {
//         alert("No such user, please reenter.");
//         return demoGithubUser();
//       } else {
//         throw err;
//       }
//     });
// }

// demoGithubUser();

// ---------------------------------------------------
// --------------------MY SOLUTION--------------------
class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

async function loadJson(url) {
  const response = await fetch(url);

  if (response.status === 200) {
    return response.json();
  } else {
    throw new HttpError(response);
  }
}

// Ask for a user name until github returns a valid user
// async function demoGithubUser() {
//   let user;

//   while (true) {
//     let name = prompt('Enter a name?', 'iliakan');
//     try {
//       user = await loadJson(`https://api.github.com/users/${name}`);
//       break;
//     } catch (err) {
//       if (err instanceof HttpError && err.response.status == 404) {
//         alert('No such user, please reenter.');
//       } else {
//         throw err;
//       }
//     }
//   }

//   alert(`Full name: ${user.name}`);
//   return user;
// }

// demoGithubUser();

// 3. Call async from non-async
// We have a “regular” function called f. How can you call the async function wait() and use its result inside of f?

// async function wait() {
//   await new Promise(resolve => setTimeout(resolve, 1000));

//   return 10;
// }

// function f() {
// ...what should you write here?
// we need to call async wait() and wait to get 10
// remember, we can't use "await"
// }

// ---------------------------------------------------
// --------------------MY SOLUTION--------------------
async function wait() {
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  try {
    const foo = await new Promise(
      (resolve, reject) => setTimeout(resolve),
      2000
    );
  } catch (error) {
    throw 'Promise has been rejected!';
  }

  return 10;
}

function f() {
  wait()
    .then((message) => {
      console.log(message);
    })
    .catch((err) => {
      console.log(`Rejected: ${err}`);
    });
  // ...what should you write here?
  // we need to call async wait() and wait to get 10
  // remember, we can't use "await"
}

f();
