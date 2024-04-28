import { ILocalStore } from "hooks/useLocalStore";
import { action, computed, makeObservable, observable } from "mobx";
import { RecipeListRequest, Status } from "config/apiTypes";
import { SuccessfulStatus } from "config/initValues";

type PrivateFields = '_status' | '_recipeList';

export default class RecipeListStore implements ILocalStore {
    private _status: Status = SuccessfulStatus;
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

    get totalResults() {
        return this._recipeList.totalResults;
    }

    get status() {
        return this._status;
    }

    destroy(): void {
        this._recipeList = { results: [], totalResults: 0 };
        this._status = SuccessfulStatus;
    }
}