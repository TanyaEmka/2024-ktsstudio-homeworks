import BaseQuery from "utils/queryClass";

class RecipeQuery extends BaseQuery {
    constructor() {
        super({
            baseQuery: 'https://api.spoonacular.com/recipes/',
            points: {
                GetRecipeList: {
                    method: 'get',
                    path: (offset, apiKey) => 
                        `complexSearch?addRecipeNutrition=true&number=9&offset=${offset}&apiKey=${apiKey}`,
                },
                GetRecipe: {
                    method: 'get',
                    path: (id, apiKey) => `${id}/information?apiKey=${apiKey}`,
                }
            }
        });
    }
}

const recipeQuery = new RecipeQuery();

export default recipeQuery._queries;