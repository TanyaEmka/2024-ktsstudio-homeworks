import { action, computed, makeObservable, observable } from "mobx";
import { Option } from "components/MultiDropdown";
import { ILocalStore } from "hooks/useLocalStore";

type PrivateFields = '_searchField' | '_category';

export default class FilterStore implements ILocalStore {
    private _searchField = '';
    private _category: Array<Option> = [];
    
    constructor() {
        makeObservable<FilterStore, PrivateFields>(this, {
            _searchField: observable,
            _category: observable,
            setSearch: action.bound,
            setCategory: action.bound,
            searchField: computed,
            category: computed,
        })
    }

    setSearch(newValue: string) {
        this._searchField = newValue;
    }

    setCategory(newValue: Array<Option>) {
        this._category = newValue;
    }

    get searchField() {
        return this._searchField;
    }

    get category() {
        return this._category;
    }

    destroy(): void {
        this._searchField = '';
        this._category = [];
    }
}