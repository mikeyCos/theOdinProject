console.log(__dirname);
console.log(__filename);

setTimeout(() => {
  console.log("setTimeout fired after 5 seconds");
  clearInterval(interval);
}, 5000);

let i = 0;
const interval = setInterval(() => {
  console.log(i);
  i++;
}, 1000);
