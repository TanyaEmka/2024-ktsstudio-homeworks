import { action, computed, makeObservable, observable } from "mobx";
import { Option } from "components/MultiDropdown";
import { ILocalStore } from "hooks/useLocalStore";
import { 
    NumberStoreType,
    BooleanStoreType,
    StringStoreType,
    MinMaxStoreType 
} from "types/filterTypes";

type PrivateFields = '_searchField' | '_category';

export default class FilterStore implements ILocalStore {
    private _searchField = '';
    private _category: Array<Option> = [];
    private _cuisine: Array<Option> = [];
    private _excludeCuisine: Array<Option> = [];
    private _diet: Array<Option> = [];
    private _intolerances: Array<Option> = [];

    private _stringOptions: Array<StringStoreType> = [];
    private _numberOptions: Array<NumberStoreType> = [];
    private _booleanOptions: Array<BooleanStoreType> = [];
    private _minMaxOptions: Array<MinMaxStoreType> = [];
    
    constructor() {
        makeObservable<FilterStore, PrivateFields>(this, {
            _searchField: observable,
            _category: observable.ref,
            setSearch: action.bound,
            setCategory: action.bound,
            searchField: computed,
            category: computed,
        });
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