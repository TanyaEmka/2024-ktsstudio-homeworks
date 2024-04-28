import { ILocalStore } from "hooks/useLocalStore";
import { action, makeObservable, observable } from "mobx";

type PrivateFields = 'searchField' | 'category';

export default class FilterStore {
    searchField = '';
    category = '';
    
    constructor() {
        makeObservable<FilterStore, PrivateFields>(this, {
            searchField: observable,
            category: observable,
            changeSearch: action,
            changeCategory: action
        })
    }

    changeSearch(newValue: string) {
        this.searchField = newValue;
    }

    changeCategory(newValue: string) {
        this.category = newValue;
    }

    destroy(): void {
        this.searchField = '';
        this.category = '';
    }
}