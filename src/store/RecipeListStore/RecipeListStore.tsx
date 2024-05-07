import axios from "axios";
import { action, computed, makeObservable, observable } from "mobx";
import { urlPrefix, pageElementCount, apiKey } from "config/api";
import { 
    LoadingStatus, 
    NotStartedStatus, 
    SuccessfulStatus, 
    errorStatus
} from "config/initValues";
import { ILocalStore } from "hooks/useLocalStore";
import { RecipeListRequest, Status, RecipeUnit } from "types/apiTypes";
import {
    getInitialCollectionModel, 
    normalizeCollection, 
    linearizeCollection 
} from "utils/collection";

type PrivateFields = '_status' | '_recipeResults' | '_totalResults';

type RecipeCollectionUnitType = RecipeUnit & {
    kcal: string,
    describe: string,
};

export default class RecipeListStore implements ILocalStore {
    private _status: Status = NotStartedStatus;
    private _recipeResults = getInitialCollectionModel<number, RecipeCollectionUnitType>();
    private _totalResults: number = 0;
    
    constructor() {
        makeObservable<RecipeListStore, PrivateFields>(this, {
            _status: observable.ref,
            _recipeResults: observable.ref,
            _totalResults: observable,
            setStatus: action.bound,
            setRecipeList: action.bound,
            loadingRecipeList: action.bound,
            results: computed,
            totalResults: computed,
            status: computed,
        })
    }

    setStatus(newStatus: Status) {
        this._status = { ...newStatus };
    }

    setRecipeList(newList: RecipeListRequest) {
        this._recipeResults = normalizeCollection(newList.results.map((recipe) => {
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
        this._totalResults = newList.totalResults;
    }

    get results() {
        return linearizeCollection(this._recipeResults);
    }

    get totalResults() {
        return this._totalResults;
    }

    get status() {
        return this._status;
    }

    getKcal(recipe: RecipeUnit) {
        const recipeKcal = recipe.nutrition.nutrients
            .filter((obj) => obj.name === 'Calories')[0];

        return [Math.ceil(recipeKcal.amount), recipeKcal.unit].join(' ');
    }

    getDescribe(ingredients: Array<{ name: string }>) {
        return ingredients.map((ing) => ing.name).join(' + ');
    }

    loadingRecipeList(
        offset: string, 
        query: string = '', 
        types: string | null = ''
    ) {
        const params = {
            addRecipeNutrition: true,
            number: pageElementCount,
            offset: offset,
            apiKey: apiKey,
            query: query,
        }
        const pathUrl = 'complexSearch?';
        const pathParams = Object.entries(params).map((param) => param.join('='));
        const url = urlPrefix + 'recipes/' + pathUrl + [...pathParams, types].join('&');
        this.setStatus(LoadingStatus);
        axios.get(url)
        .then((resp) => {
            this.setStatus(SuccessfulStatus);
            this.setRecipeList(resp.data);
        })
        .catch((err) => {
            this.setStatus(errorStatus(err.message));
        })
    }

    destroy(): void {
        this._recipeResults = getInitialCollectionModel();
        this._totalResults = 0;
        this._status = NotStartedStatus;
    }
}