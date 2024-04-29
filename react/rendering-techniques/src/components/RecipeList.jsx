import { recipes } from "../data/data.recipes";

function IngredientsListItem({ ingredient }) {
  return <li>{ingredient}</li>;
}

function IngredientsList({ ingredients }) {
  return (
    <ul>
      {ingredients.map((ingredient) => {
        return <IngredientsListItem key={ingredient} ingredient={ingredient} />;
      })}
    </ul>
  );
}

function RecipeSection({ name, ingredients }) {
  return (
    <article>
      <h3>{name}</h3>
      <h4>Ingredients:</h4>
      <IngredientsList ingredients={ingredients} />
    </article>
  );
}

export default function RecipesList() {
  return (
    <div>
      <h2>Recipes</h2>
      {recipes.map((recipe) => {
        return <RecipeSection key={recipe.id} {...recipe} />;
      })}
    </div>
  );
}
