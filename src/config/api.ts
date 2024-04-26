export const apiKey: string = '5926db0a188d4b9e98035f4dbd7cd834';
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
