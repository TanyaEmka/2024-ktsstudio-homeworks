export const apiKey = '40532b3e701c465bb20134983ac0f837';
// 66e4df47862c4978bfafa99ce991e16d
// 40532b3e701c465bb20134983ac0f837
export const pageElementCount = 9;
export const urlPrefix = 'https://api.spoonacular.com/';
export const imagePrefix = 'https://img.spoonacular.com/';

export const mealTypes = [
    'main course', 'side dish',
    'dessert', 'appetizer',
    'salad', 'bread',
    'breakfast', 'soup',
    'beverage', 'sauce',
    'marinade', 'fingerfood',
    'snack', 'drink'];

export const cuisineList = [
    'African', 'Asian', 'American', 
    'British', 'Cajun', 'Caribbean',
    'Chinese', 'Eastern European', 'European', 
    'French', 'German', 'Greek', 'Indian', 
    'Irish', 'Italian', 'Japanese',
    'Jewish', 'Korean', 'Latin American', 
    'Mediterranean', 'Mexican', 'Middle Eastern',
    'Nordic', 'Sothern', 'Spanish', 
    'Thai', 'Vietnamese'];

export const dietList = [
    'Gluten Free', 'Ketogenic',
    'Vegetarian', 'Lacto-Vegetarian',
    'Ovo-Vegetarian', 'Vegan',
    'Pescetarian', 'Paleo',
    'Primal', 'Low FODMAP', 'Whole30'];

export const intoleranceList = [
    'Dairy', 'Egg',
    'Gluten', 'Grain',
    'Peanut', 'Seafood',
    'Sesame', 'Shellfish',
    'Soy', 'Sulfite',
    'Tree Nut', 'Wheat'];

export const sortList = [
    'meta-score', 'popularity', 'healthiness',
    'price', 'time', 'random',
    'max-used-ingredients', 'min-missing-ingredients', 'alcohol',
    'caffeine', 'copper', 'energy',
    'calories', 'calcium', 'carbohydrates',
    'carbs', 'choline', 'cholesterol',
    'total-fat', 'fluoride', 'trans-fat',
    'saturated-fat', 'mono-unsaturated-fat', 'poly-unsaturated-fat',
    'fiber', 'folate', 'folic-acid',
    'iodine', 'iron', 'magnesium',
    'manganese', 'vitamin-b3', 'niacin',
    'vitamin-b5', 'pantothenic-acid', 'phosphorus',
    'potassium', 'protein', 'vitamin-b2',
    'riboflavin', 'selenium', 'sodium',
    'vitamin-b1', 'thiamin', 'vitamin-a',
    'vitamin-b6', 'vitamin-b12', 'vitamin-c',
    'vitamin-d', 'vitamin-e', 'vitamin-k',
    'sugar', 'zinc'];

export const sortDirectionList = ['asc', 'desc'];

export const stringFilters = [
    'author', 'tags', 
    'titleMatch', 'equipment'
];

export const booleanFilters = [ 'ignorePantry' ];

export const minMaxFilters = [
    'Servings', 'Carbs', 'Protein',
    'Calories', 'Fat', 'Alcohol',
    'Caffeine', 'Copper', 'Calcium',
    'Choline', 'Cholesterol', 'Fluoride',
    'SaturatedFat', 'VitaminA', 'VitaminC',
    'VitaminD', 'VitaminE', 'VitaminK',
    'VitaminB1', 'VitaminB2', 'VitaminB5',
    'VitaminB3', 'VitaminB6', 'VitaminB12',
    'Fiber', 'Folate', 'FolicAcid',
    'Iodine', 'Iron', 'Magnesium',
    'Manganese', 'Phosphorus', 'Potassium',
    'Selenium', 'Sodium', 'Sugar',
    'Zinc'];

export const numberFilters = [ 'maxReadyTime' ];

export const mealTypesOptions = mealTypes
    .map((type, index) => ({ key: index.toString(), value: type }));

export const cuisineTypesOptions = cuisineList
    .map((type, index) => ({ key: index.toString(), value: type.toLowerCase() }));

export const dietTypesOptions = dietList
    .map((type, index) => ({ key: index.toString(), value: type.toLowerCase() }));

export const intoleranceTypesOptions = intoleranceList
    .map((type, index) => ({ key: index.toString(), value: type.toLowerCase() }));

export const minMaxTypesOptions = minMaxFilters
    .map((type, index) => ({ key: index.toString(), value: type }));

export const sortTypesOptions = sortList
    .map((type, index) => ({ key: index.toString(), value: type }));

export const sortdirectTypesOptions = sortDirectionList
    .map((type, index) => ({ key: index.toString(), value: type }));

export const publicTemplates = [
    {
        key: '37',
        value: "Busy Work Week"
    },
    {
        key: '480',
        value: "Keto Meal Plan"
    },
    {
        key: '120',
        value: "Not-So-Strict Paleo Meal Plan"
    },
    {
        key: '451',
        value: "Week 1 Meal Plan"
    },
    {
        key: '581',
        value: "Whole30 Meal Plan"
    },
];

export const ingredientFilters = {
    sort: {
        type: 'OPTION',
        placeholder: 'sort',
        options: sortTypesOptions,
        selectMode: 'ONE'
    },
    sortDirection: {
        type: 'OPTION',
        placeholder: 'sort direction',
        options: sortdirectTypesOptions,
        selectMode: 'ONE'
    },
    language: {
        type: 'STRING',
        placeholder: 'en or de'
    },
};

export const recipesFilters = {
        cuisine: {
            type: 'OPTION',
            placeholder: 'cuisine',
            options: cuisineTypesOptions
        },
        excludeCuisine: {
            type: 'OPTION',
            placeholder: 'excludeCuisine',
            options: cuisineTypesOptions
        },
        diet: {
            type: 'OPTION',
            placeholder: 'diet',
            options: dietTypesOptions,
        },
        intolerances: { 
            type: 'OPTION',
            placeholder: 'intolerances',
            options: intoleranceTypesOptions
        },
        equipment: {
            type: 'STRING',
            placeholder: 'equipment'
        },
        includeIngredients: {
            type: 'STRING',
            placeholder: 'tomato,cheese'
        },
        excludeIngredients: {
            type: 'STRING',
            placeholder: 'eggs,tomato'
        },
        author: {
            type: 'STRING',
            placeholder: 'author',
        },
        tags: {
            type: 'STRING',
            placeholder: 'tag1,tag2,...'
        },
        titlteMatch: {
            type: 'STRING',
            placeholder: 'Title'
        },
        maxReadyTime: {
            type: 'NUMBER',
            placeholder: 'max ready time',
        },
        ignorePantry: {
            type: 'BOOLEAN',
            placeholder: '...',
        },
        other: {
            type: 'MINMAX',
            minMaxValues: minMaxTypesOptions,
        },
        sort: {
            type: 'OPTION',
            placeholder: 'sort',
            options: sortTypesOptions,
            selectMode: 'ONE'
        },
        sortDirection: {
            type: 'OPTION',
            placeholder: 'sort direction',
            options: sortdirectTypesOptions,
            selectMode: 'ONE'
        }
    };