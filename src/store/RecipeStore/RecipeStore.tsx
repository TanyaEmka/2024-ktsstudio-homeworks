import { action, computed, makeObservable, observable } from "mobx";
import { RecipeType, Status } from "types/apiTypes";
import { RecipeInit, NotStartedStatus } from "config/initValues";
import { ILocalStore } from "hooks/useLocalStore";

type PrivateFields = '_status' | '_recipe';

export default class RecipeStore implements ILocalStore {
    private _status: Status = NotStartedStatus;
    private _recipe: RecipeType = RecipeInit;
    
    constructor() {
        makeObservable<RecipeStore, PrivateFields>(this, {
            _status: observable.ref,
            _recipe: observable.ref,
            setStatus: action.bound,
            setRecipe: action.bound,
            recipe: computed,
            status: computed,
        })
    }

    setStatus(newStatus: Status) {
        this._status = { ...newStatus };
    }

    setRecipe(newRecipe: RecipeType) {
        this._recipe = { ...newRecipe };
    }

    get recipe() {
        return this._recipe;
    }

    get status() {
        return this._status;
    }

    destroy(): void {
        this._recipe = RecipeInit;
        this._status = NotStartedStatus;
    }
}