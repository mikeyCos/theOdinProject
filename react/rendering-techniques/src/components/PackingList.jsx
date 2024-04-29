function Item({ importance, name, isPacked }) {
  //   const itemContent = isPacked ? <del> {name + " ✔"}</del> : name + " ❌";
  //   return <li className="item">{itemContent}</li>;
  return (
    <li className="item">
      {name} {importance > 0 && <i>(Importance: {importance})</i>}{" "}
      {isPacked ? "✔" : "❌"}
    </li>
  );
}

// function List(props) {
//   return (
//     <ul>
//       {props.packedItems.map((item, index) => {
//         console.log(item);
//         return <Item key={index} item={item} />;
//       })}
//     </ul>
//   );
// }

export default function PackingList() {
  //   const packedItems = [
  //     { isPacked: "true", name: "Space suit" },
  //     {
  //       isPacked: "true",
  //       name: "Helmet with a golden leaf",
  //     },
  //     {
  //       isPacked: "false",
  //       name: "Photo of Tam",
  //     },
  //   ];

  return (
    <section>
      <h2>Sally Ride&apos;s Packing list</h2>
      <ul>
        <Item importance={9} isPacked={true} name="Space suit" />
        <Item importance={0} isPacked={true} name="Helmet with a golden leaf" />
        <Item importance={6} isPacked={false} name="Photo of Tam" />
      </ul>
    </section>
  );
}
