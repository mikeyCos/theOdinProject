const Animal = (type, name) => {
  const greet = () => {
    console.log(`Hello, my name is ${name} and I am a ${type}.`);
  };

  return { type, name, greet };
};

export default Animal;
