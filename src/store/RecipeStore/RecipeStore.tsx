import axios from "axios";
import { action, computed, makeObservable, observable } from "mobx";
import { urlPrefix, apiKey } from "config/api";
import { 
    RecipeInit, 
    NotStartedStatus, 
    LoadingStatus, 
    SuccessfulStatus, 
    errorStatus 
} from "config/initValues";
import { ILocalStore } from "hooks/useLocalStore";
import { RecipeType, Status } from "types/apiTypes";

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
            loadingRecipe: action.bound,
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

    loadingRecipe(id: number) {
        const url = urlPrefix + 'recipes/' + id + '/information?apiKey=' + apiKey;
        this.setStatus(LoadingStatus);
        axios.get(url)
        .then((resp) => {
            this.setStatus(SuccessfulStatus);
            this.setRecipe(resp.data);
        })
        .catch((err) => {
            this.setStatus(errorStatus(err.response.data.message));
        })
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