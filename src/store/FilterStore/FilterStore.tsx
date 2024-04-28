import { Option } from "components/MultiDropdown";
import { ILocalStore } from "hooks/useLocalStore";
import { action, computed, makeObservable, observable } from "mobx";

type PrivateFields = '_searchField' | '_category';

export default class FilterStore implements ILocalStore {
    private _searchField = '';
    private _category: Array<Option> = [];
    
    constructor() {
        makeObservable<FilterStore, PrivateFields>(this, {
            _searchField: observable,
            _category: observable,
            changeSearch: action.bound,
            changeCategory: action.bound,
            searchField: computed,
            category: computed,
        })
    }

    changeSearch(newValue: string) {
        this._searchField = newValue;
    }

    changeCategory(newValue: Array<Option>) {
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