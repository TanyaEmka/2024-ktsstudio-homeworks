export const apiKey = '66e4df47862c4978bfafa99ce991e16d';
// 40532b3e701c465bb20134983ac0f837
export const pageElementCount = 9;
export const urlPrefix = 'https://api.spoonacular.com/';

export const mealTypes = ['main course', 
                    'side dish',
                    'dessert',
                    'appetizer',
                    'salad',
                    'bread',
                    'breakfast',
                    'soup',
                    'beverage',
                    'sauce',
                    'marinade',
                    'fingerfood',
                    'snack',
                    'drink'];

export const mealTypesOptions = mealTypes
    .map((type, index) => ({ key: index.toString(), value: type }));