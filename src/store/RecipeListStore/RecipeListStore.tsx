import { action, computed, makeObservable, observable } from "mobx";
import { RecipeListRequest, Status, RecipeUnit, RecipeList } from "config/apiTypes";
import { NotStartedStatus } from "config/initValues";
import { ILocalStore } from "hooks/useLocalStore";

type PrivateFields = '_status' | '_recipeResults' | '_totalResults';

export default class RecipeListStore implements ILocalStore {
    private _status: Status = NotStartedStatus;
    private _recipeResults: RecipeList = [];
    private _totalResults: number = 0;
    
    constructor() {
        makeObservable<RecipeListStore, PrivateFields>(this, {
            _status: observable.ref,
            _recipeResults: observable.ref,
            _totalResults: observable,
            setStatus: action.bound,
            setRecipeList: action.bound,
            results: computed,
            totalResults: computed,
            status: computed,
        })
    }

    setStatus(newStatus: Status) {
        this._status = { ...newStatus };
    }

    setRecipeList(newList: RecipeListRequest) {
        this._recipeResults = [ ...newList.results ];
        this._totalResults = newList.totalResults;
    }

    get results() {
        return this._recipeResults;
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

    destroy(): void {
        this._recipeResults = [];
        this._totalResults = 0;
        this._status = NotStartedStatus;
    }
}