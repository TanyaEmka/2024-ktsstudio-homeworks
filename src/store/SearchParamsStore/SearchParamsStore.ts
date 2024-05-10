import { action, computed, makeObservable, observable } from "mobx";
import { ILocalStore } from "hooks/useLocalStore";
import { SetURLSearchParams, useSearchParams } from "react-router-dom";

type PrivateFields = '_searchParams' | '_setParams';

export default class SearchParamsStore implements ILocalStore {
    private _searchParams: URLSearchParams;
    private _setParams: SetURLSearchParams;
    
    constructor() {
        makeObservable<SearchParamsStore, PrivateFields>(this, {
            _searchParams: observable.ref,
            _setParams: observable.ref,
            setSearchParams: action.bound,
        });

        const [initValue, setSearchParams] = useSearchParams();
        this._searchParams = initValue;
        this._setParams = setSearchParams;
    }

    setSearchParams(newParams: URLSearchParams) {
        this._searchParams = newParams;
        this._setParams(this._searchParams);
    }

    destroy(): void {
        this._searchParams = {} as URLSearchParams;
        this._setParams = () => {};
    }
}