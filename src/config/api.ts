export const apiKey: string = '66e4df47862c4978bfafa99ce991e16d';
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
