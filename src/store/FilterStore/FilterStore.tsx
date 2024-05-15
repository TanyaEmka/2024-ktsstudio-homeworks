import { action, computed, makeObservable, observable } from "mobx";
import { Option } from "components/MultiDropdown";
import { ILocalStore } from "hooks/useLocalStore";
import { 
    NumberStoreType, BooleanStoreType,
    StringStoreType, MinMaxStoreType 
} from "types/filterTypes";
import { getStoreFilterArr, getIndexByName } from "utils/filterHandlers";
import { 
    stringFilters, booleanFilters,
    numberFilters, minMaxFilters
} from "config/api";

type PrivateFields = 
    '_searchField' | '_category' |
    '_cuisine' | '_excludeCuisine' |
    '_diet' | '_intolerances' |
    '_stringOptions' | '_numberOptions' |
    '_booleanOptions' | '_minMaxOptions';

export default class FilterStore implements ILocalStore {
    private _searchField = '';
    private _category: Array<Option> = [];

    private _cuisine: Array<Option> = [];
    private _excludeCuisine: Array<Option> = [];
    private _diet: Array<Option> = [];
    private _intolerances: Array<Option> = [];

    private _stringOptions = getStoreFilterArr<StringStoreType>(stringFilters, '');
    private _numberOptions = getStoreFilterArr<NumberStoreType>(numberFilters, 0);
    private _booleanOptions = getStoreFilterArr<BooleanStoreType>(booleanFilters, false);
    private _minMaxOptions = getStoreFilterArr<MinMaxStoreType>(minMaxFilters, { min: 0, max: 0 });
    
    constructor() {
        makeObservable<FilterStore, PrivateFields>(this, {
            _searchField: observable,
            _category: observable.ref,

            _cuisine: observable.ref,
            _excludeCuisine: observable.ref,
            _diet: observable.ref,
            _intolerances: observable.ref,

            _stringOptions: observable.ref,
            _numberOptions: observable.ref,
            _booleanOptions: observable.ref,
            _minMaxOptions: observable.ref,

            setSearch: action.bound,
            setCategory: action.bound,

            setCuisine: action.bound,
            setExcludeCuisine: action.bound,
            setDiet: action.bound,
            setIntolerances: action.bound,

            setString: action.bound,
            setNumber: action.bound,
            setBoolean: action.bound,
            setMinMax: action.bound,

            searchField: computed,
            category: computed,

            cuisine: computed,
            excludeCuisine: computed,
            diet: computed,
            intolerances: computed,

            stringValues: computed,
            numberValues: computed,
            booleanValues: computed,
            minMaxValues: computed,

        });
    }

    setSearch(newValue: string) {
        this._searchField = newValue;
    }

    setCategory(newValue: Array<Option>) {
        this._category = newValue;
    }

    setCuisine(newCuisine: Array<Option>) {
        this._cuisine = newCuisine;
    }

    setExcludeCuisine(newExclude: Array<Option>) {
        this._excludeCuisine = newExclude;
    }

    setDiet(newDiet: Array<Option>) {
        this._diet = newDiet;
    }

    setIntolerances(newInt: Array<Option>) {
        this._intolerances = newInt;
    }

    setString(name: string, newString: string) {
        const index = getIndexByName(this._stringOptions, name);
        if (index !== -1) {
            this._stringOptions[index].value = newString;
        }
    }

    setNumber(name: string, newNumber: number) {
        const index = getIndexByName(this._numberOptions, name);
        if (index !== -1) {
            this._numberOptions[index].value = newNumber;
        }
    }

    setBoolean(name: string, newBoolean: boolean) {
        const index = getIndexByName(this._booleanOptions, name);
        if (index !== -1) {
            this._booleanOptions[index].value = newBoolean;
        }
    }

    setMinMax(name: string, newMinMax: { min: number, max: number }) {
        const index = getIndexByName(this._minMaxOptions, name);
        if (index !== -1) {
            this._minMaxOptions[index].value.min = newMinMax.min;
            this._minMaxOptions[index].value.max = newMinMax.max;
        }
    }

    get searchField() {
        return this._searchField;
    }

    get category() {
        return this._category;
    }

    get cuisine() {
        return this._cuisine;
    }

    get excludeCuisine () {
        return this._excludeCuisine;
    }

    get diet() {
        return this._diet;
    }

    get intolerances() {
        return this._intolerances;
    }

    get stringValues() {
        return this._stringOptions;
    }

    get numberValues() {
        return this._numberOptions;
    }

    get booleanValues() {
        return this._booleanOptions;
    }

    get minMaxValues() {
        return this._minMaxOptions;
    }

    destroy(): void {
        this._searchField = '';
        this._category = [];
    }
}
