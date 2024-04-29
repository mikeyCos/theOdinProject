const drinks = {
  tea: {
    plant: "leaf",
    caffeine: "15-70",
    age: "4,000",
  },
  coffee: {
    plant: "bean",
    caffeine: "80-185",
    age: "1,000",
  },
};

function Drink({ name }) {
  //   let plant = "leaf";
  //   let caffeineContent = "15-70";
  //   let age = "4,000";

  //   if (name !== "tea") {
  //     plant = "bean";
  //     caffeineContent = "80-185";
  //     age = "1,000";
  //   }
  const { plant, caffeine, age } = drinks[name];

  return (
    <section>
      <h2>{name}</h2>
      <dl>
        <dt>Part of plant</dt>
        <dd>{plant}</dd>
        <dt>Caffeine content</dt>
        <dd>{caffeine} mg/cup</dd>
        <dt>Age</dt>
        <dd>{age}+ years</dd>
      </dl>
    </section>
  );
}

export default function DrinkList() {
  return (
    <div>
      <Drink name="tea" />
      <Drink name="coffee" />
    </div>
  );
}
