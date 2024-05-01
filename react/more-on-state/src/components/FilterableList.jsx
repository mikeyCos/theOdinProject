import { useState } from "react";
import { foods, filterItems } from "../data/data.filterableList";
import "../styles/filterableList.css";

export default function FilterableList() {
  const [query, setQuery] = useState("");

  function handleChange(e) {
    setQuery(e.target.value);
  }

  const filteredFoods = filterItems(foods, query);

  return (
    <div className="filterable_list">
      <SearchBar query={query} onChangeHandler={handleChange} />
      <hr />
      <List items={filteredFoods} />
    </div>
  );
}

function SearchBar({ query, onChangeHandler }) {
  return (
    <label>
      Search: <input value={query} onChange={onChangeHandler} />
    </label>
  );
}

function List({ items }) {
  return (
    <table>
      <tbody>
        {items.map((food) => (
          <tr key={food.id}>
            <td>{food.name}</td>
            <td>{food.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
