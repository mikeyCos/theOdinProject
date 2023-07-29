export default function buildMenu() {
    console.log(`menu.js running`);
    const menuContainer = document.createElement('div');
    menuContainer.id = 'menu';

    const header = document.createElement('h1');
    const headerText = document.createTextNode('Menu');
    header.appendChild(headerText);
    menuContainer.appendChild(header);

    menuContainer.appendChild(menu.render());
    return menuContainer;
}

const food = (dish, details, price) => {
    const foodName = dish;
    const foodDetails = details;
    const foodPrice = price;
    
    return {
        get dish() {
            return foodName;
        },
        get details() {
            return foodDetails;
        },
        get price() {
            return foodPrice;
        },
    }
}

const menu = {
    test: 'test',
    food: {
        pizzas: [
            food('rhoa', 'tomato sauce, mozzarella, oregano, roasted rhoa', '15.00'),
            food('pepperoni', 'tomato sauce, mozzarella, oregano, pepperoni', '10.00'),
        ],
        salads: [
            food('weta', 'romaine lettuce, cucumber, sunflower seeds, tomatoes, weta', '5.00'),
        ]
    },
    render: function() {
        const foodContainer = document.createElement('div');
        for (let item in this.food) {
            const menuSection = document.createElement('div');
            const menuSectionHeader = document.createElement(('h2'));
            const menuSectionHeaderText = document.createTextNode(item);
            menuSection.classList.add(item);
            menuSectionHeader.appendChild(menuSectionHeaderText);
            menuSection.appendChild(menuSectionHeader);
            console.log(typeof this.food[item])
            this.food[item].map(food => { 
                const menuItemContainer = document.createElement('div');
                for (let info in food) {
                    const menuItemParagraph = document.createElement('p');
                    const menuItemParagraphText = document.createTextNode(food[info])
                    menuItemParagraph.appendChild(menuItemParagraphText);
                    menuItemContainer.appendChild(menuItemParagraph)
                };
                menuSection.appendChild(menuItemContainer);
            });
            foodContainer.appendChild(menuSection);
        }
        return foodContainer;
    }
}
//Pizzas
//Signature Pizzas
//Sides