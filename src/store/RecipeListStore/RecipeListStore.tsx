import { action, computed, makeObservable, observable } from "mobx";
import { RecipeListRequest, Status, RecipeUnit } from "config/apiTypes";
import { NotStartedStatus } from "config/initValues";
import { ILocalStore } from "hooks/useLocalStore";

type PrivateFields = '_status' | '_recipeList';

export default class RecipeListStore implements ILocalStore {
    private _status: Status = NotStartedStatus;
    private _recipeList: RecipeListRequest = {
        results: [],
        totalResults: 0,
    };
    
    constructor() {
        makeObservable<RecipeListStore, PrivateFields>(this, {
            _status: observable,
            _recipeList: observable,
            setStatus: action.bound,
            setRecipeList: action.bound,
            recipeList: computed,
            results: computed,
            totalResults: computed,
            status: computed,
        })
    }

    setStatus(newStatus: Status) {
        this._status = { ...newStatus };
    }

    setRecipeList(newList: RecipeListRequest) {
        this._recipeList = { ...newList };
    }

    get recipeList() {
        return this._recipeList;
    }

    get results() {
        return this._recipeList.results;
    }

    get totalResults() {
        return this._recipeList.totalResults;
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

    destroy(): void {
        this._recipeList = { results: [], totalResults: 0 };
        this._status = NotStartedStatus;
    }
}