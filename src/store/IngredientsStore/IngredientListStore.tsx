import axios from "axios";
import { action, computed, makeObservable, observable } from "mobx";
import { urlPrefix, pageElementCount, apiKey } from "config/api";
import { 
    LoadingStatus, NotStartedStatus, 
    SuccessfulStatus, errorStatus
} from "config/initValues";
import { ILocalStore } from "hooks/useLocalStore";
import { IngredientListRequest, Status, IngredientUnit } from "types/apiTypes";
import {
    getInitialCollectionModel, 
    normalizeCollection, 
    linearizeCollection 
} from "utils/collection";

type PrivateFields = '_status' | '_ingredientResults' | '_totalResults';

export default class IngredientListStore implements ILocalStore {
    private _status: Status = NotStartedStatus;
    private _ingredientResults = getInitialCollectionModel<number, IngredientUnit>();
    private _totalResults: number = 0;
    
    constructor() {
        makeObservable<IngredientListStore, PrivateFields>(this, {
            _status: observable.ref,
            _ingredientResults: observable.ref,
            _totalResults: observable,
            setStatus: action.bound,
            setIngredientList: action.bound,
            loadingIngredientList: action.bound,
            results: computed,
            totalResults: computed,
            status: computed,
        })
    }

    setStatus(newStatus: Status) {
        this._status = { ...newStatus };
    }

    setIngredientList(newList: IngredientListRequest) {
        this._ingredientResults = normalizeCollection(newList.results, (element) => element.id);
        this._totalResults = newList.totalResults;
    }

    get results() {
        return linearizeCollection(this._ingredientResults);
    }

    get totalResults() {
        return this._totalResults;
    }

    get status() {
        return this._status;
    }

    loadingIngredientList(
        offset: string, 
        query: string,
        ...other: Array<[string, string | null]>
    ) {
        const params = {
            number: pageElementCount,
            offset: offset,
            query: query,
            apiKey: apiKey,
        }
        const pathUrl = 'search?';
        let pathParams = Object.entries(params).map((param) => param.join('='));
        other.forEach((element) => {
            if (element[1] !== null) {
                pathParams.push(element.join('='));
            }
        });
        const url = urlPrefix + 'food/ingredients/' + pathUrl + [...pathParams ].join('&');
        console.log(url);
        this.setStatus(LoadingStatus);
        console.log(this._status);
        axios.get(url)
        .then((resp) => {
            this.setStatus(SuccessfulStatus);
            this.setIngredientList(resp.data);
            console.log(this._status, this._ingredientResults);
        })
        .catch((err) => {
            this.setStatus(errorStatus(err.message));
        })
    }

    destroy(): void {
        this._ingredientResults = getInitialCollectionModel();
        this._totalResults = 0;
        this._status = NotStartedStatus;
    }
}