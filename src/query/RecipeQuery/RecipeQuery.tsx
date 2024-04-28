import BaseQuery from "utils/queryClass";

class RecipeQuery extends BaseQuery {
    constructor() {
        super({
            baseQuery: 'https://api.spoonacular.com/recipes/',
            points: {
                GetRecipeList: {
                    method: 'get',
                    path: (offset, apiKey, query='', types='') => {
                        const params = {
                            addRecipeNutrition: true,
                            number: 9,
                            offset: offset,
                            apiKey: apiKey,
                            query: query,
                        }
                        let pathUrl = 'complexSearch?';
                        let pathParams = Object.entries(params).map((param) => param.join('='));
                        return pathUrl + [...pathParams, types].join('&');
                    }
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