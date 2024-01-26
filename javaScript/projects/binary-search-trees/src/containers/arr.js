// creates an array of n length filled with numbers between 0 and 100
const Arr = (n) => {
  const generateNumbers = () => {
    return Math.floor(Math.random() * 100);
  };
  const array = new Array(n).fill().map(() => generateNumbers());
  return array;
};

export default Arr;
