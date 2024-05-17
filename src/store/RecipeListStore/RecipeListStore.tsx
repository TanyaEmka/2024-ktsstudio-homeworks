import { urlPrefix, pageElementCount, apiKey } from "config/api";
import { RecipeUnit } from "types/apiTypes";
import {
    normalizeCollection, 
} from "utils/collection";

import BaseListStore from "store/BaseListStore";

type RecipeCollectionUnitType = RecipeUnit & {
    kcal: string,
    describe: string,
};

export default class RecipeListStore extends BaseListStore<RecipeCollectionUnitType> {

    setResultRequest(newResultList: RecipeUnit[], newTotal: number): void {
        this._results = normalizeCollection(newResultList.map((recipe) => {
            const recipeKcal = recipe.nutrition.nutrients
                .filter((obj) => obj.name === 'Calories')[0];
            const kcalStr = [Math.ceil(recipeKcal.amount), recipeKcal.unit].join(' ');
            const describeStr = recipe.nutrition.ingredients.map((ing) => ing.name).join(' + ');
            return {
                kcal: kcalStr,
                describe: describeStr,
                ...recipe
            }
        }), (element) => element.id);
        this._total = newTotal;
    }

    getUrl(
        offset: string, 
        ...other: Array<[string, string | null]>
    ) {
        const params = {
            addRecipeNutrition: true,
            number: pageElementCount,
            offset: offset,
            apiKey: apiKey,
        }
        const pathUrl = 'complexSearch?';
        let pathParams = Object.entries(params).map((param) => param.join('='));
        other.forEach((element) => {
            if (element[1] !== null) {
                pathParams.push(element.join('='));
            }
        });
        const url = urlPrefix + 'recipes/' + pathUrl + [...pathParams ].join('&');
        return url;        
    }
}