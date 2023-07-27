export default function buildMenu() {
    console.log(`menu.js running`);
    const menuContainer = document.createElement('div');
    menuContainer.id = 'menu';

    const header = document.createElement('h1');
    const headerText = document.createTextNode('Menu');
    header.appendChild(headerText);
    menuContainer.appendChild(header);

    // menuContainer.appendChild(food.render());
    for (let item in menu.food) {
        console.log(item);
        for (let food in menu.food[item]) {
            console.log(food);
            for (let i = 0; i < menu.food[item][food].length; i ++) {
                console.log(menu.food[item][food][i].dish);
                console.log(menu.food[item][food][i].details);
                console.log(menu.food[item][food][i].price);
            }
        }
    }
    return menuContainer;
}


// pizzas: {
//     rhoa: {
//         details: 'tomato sauce, mozzarella, oregano, roasted rhoa',
//         price: '15.00'
//     },
//     pepperoni: {
//         details: 'tomato sauce, mozzarella, oregano, pepperoni',
//         price: '10.00',
//     },
//     margherita: {
//         details: 'tomato suace, basil, mozzarella',
//         price: '10.00',
//     },
// },
// salads: {
//     weta: {
//         details: 'romaine lettuce, cucumber, sunflower seeds, tomatoes, weta',
//         price: '5.00',
//     }
// },


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

const pizza = [
    food('rhoa', 'tomato sauce, mozzarella, oregano, roasted rhoa', '15.00'),
    food('pepperoni', 'tomato sauce, mozzarella, oregano, pepperoni', '10.00'),
];

const salad = [
    food('weta', 'romaine lettuce, cucumber, sunflower seeds, tomatoes, weta', '5.00'),
];

const menu = {
    test: 'test',
    food: {
        pizzas: {pizza},
        salads: {salad},
        appetizers: {tea: [food('test', 'a b c', '1.00'), food('vvvv', 'c d e', '2.00')]}
    },
}
//Pizzas
//Signature Pizzas
//Sides