import { configureQueryBox, buildEndPoint } from "utils/baseQuery";
import { RecipeListRequest, RecipeType } from "config/apiTypes";

export type GetRecipeListParams = {
    offset: string, 
    apiKey: string, 
    query: string | undefined, 
    types: string | undefined
}

export type GetRecipeParams = {
    id: string, 
    apiKey: string, 
}

export const RecipeQueryBox = configureQueryBox({
    baseUrl: 'https://api.spoonacular.com/recipes/',
    endPoints: {
        GetRecipeList: buildEndPoint<RecipeListRequest, GetRecipeListParams>('get', ({
            offset,
            apiKey,
            query='',
            types=''
        }) => {
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
        }),
        GetRecipe: buildEndPoint<RecipeType, GetRecipeParams>('get', (parameters) => {
           return `${parameters.id}/information?apiKey=${parameters.apiKey}`; 
        }),
    }
})

export default RecipeQueryBox;