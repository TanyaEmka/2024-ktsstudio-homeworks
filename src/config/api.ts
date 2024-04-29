export const apiKey: string = '40532b3e701c465bb20134983ac0f837';
export const recipes: string = 'https://api.spoonacular.com/recipes/complexSearch?addRecipeNutrition=true&number=9';
export const recipe: string = 'https://api.spoonacular.com/recipes/';
export const recipeParams: string = '/information?apiKey=';

export const getRecipesURL = (
    pageNumber: number, 
    pageBlock: number, 
    apiKey: string
): string => {
    return [recipes, '&offset=', (pageNumber - 1) * pageBlock, '&apiKey=', apiKey].join('');
}
