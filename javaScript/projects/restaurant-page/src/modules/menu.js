export default function buildMenu() {
    console.log(`menu.js running`);
    const menuContainer = document.createElement('div');
    menuContainer.id = 'menu';

    const header = document.createElement('h1');
    const headerText = document.createTextNode('Menu');
    header.appendChild(headerText);
    menuContainer.appendChild(header);

    menuContainer.appendChild(food.render());
    return menuContainer;
}

const food = {
    render: function() {
        const foodWrapper = document.createElement('div');
        foodWrapper.id = 'food';
        for (let type in this.pizzas) {
            const foodContainer = document.createElement('div');
            const foodHeader = document.createElement('h3');
            const foodHeaderText = document.createTextNode(type);
            foodHeader.appendChild(foodHeaderText);
            foodContainer.appendChild(foodHeader);
            for (let key in this.pizzas[type]) {
                const foodParagraph = document.createElement('p');
                const foodParagraphText = document.createTextNode(this.pizzas[type][key]);
                foodParagraph.appendChild(foodParagraphText);
                foodContainer.appendChild(foodParagraph);
            }
            foodWrapper.appendChild(foodContainer);
        }

        return foodWrapper;
    },
    pizzas: {
        rhoa: {
            toppings: 'tomato sauce, mozzarella, oregano, roasted rhoa',
            price: '15.00'
        },
        pepperoni: {
            toppings: 'tomato sauce, mozzarella, oregano, pepperoni',
            price: '10.00',
        },
        margherita: {
            toppings: 'tomato suace, basil, mozzarella',
            price: '10.00',
        },

    }
}
//Pizzas
//Signature Pizzas
//Sides