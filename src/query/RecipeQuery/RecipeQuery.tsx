import { pageElementCount, urlPrefix, apiKey } from "config/api";
import { RecipeListRequest, RecipeType } from "config/apiTypes";
import { configureQueryBox, buildEndPoint } from "utils/baseQuery";

export type GetRecipeListParams = {
    offset: string,
    query: string | undefined, 
    types: string | undefined | null
}

export type GetRecipeParams = { id: string }

export const RecipeQueryBox = configureQueryBox({
    baseUrl: urlPrefix + 'recipes/',
    endPoints: {
        GetRecipeList: buildEndPoint<RecipeListRequest, GetRecipeListParams>('get', ({
            offset,
            query='',
            types=''
        }) => {
            const params = {
                addRecipeNutrition: true,
                number: pageElementCount,
                offset: offset,
                apiKey: apiKey,
                query: query,
            }
            const pathUrl = 'complexSearch?';
            const pathParams = Object.entries(params).map((param) => param.join('='));
            return pathUrl + [...pathParams, types].join('&');
        }),
        GetRecipe: buildEndPoint<RecipeType, GetRecipeParams>('get', (parameters) => {
           return `${parameters.id}/information?apiKey=${apiKey}`; 
        }),
    }
})

export default RecipeQueryBox;
export const { useGetRecipe, useGetRecipeList } = { ...RecipeQueryBox.hooks };