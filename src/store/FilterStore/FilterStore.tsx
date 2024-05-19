import { action, computed, makeObservable, observable } from "mobx";
import { Option } from "components/MultiDropdown";
import { ILocalStore } from "hooks/useLocalStore";
import { 
    NumberStoreType, BooleanStoreType,
    StringStoreType, MinMaxStoreType 
} from "types/filterTypes";
import { normalizeFilter } from "utils/filterHandlers";
import { linearizeCollection } from "utils/collection";
import { 
    stringFilters, booleanFilters,
    numberFilters, minMaxFilters
} from "config/api";

type PrivateFields = 
    '_searchField' | '_category' | '_visibility' |
    '_cuisine' | '_excludeCuisine' |
    '_diet' | '_intolerances' |
    '_stringOptions' | '_numberOptions' |
    '_booleanOptions' | '_minMaxOptions';

export default class FilterStore implements ILocalStore {
    private _searchField = '';
    private _category: Array<Option> = [];
    private _visibility: boolean = false;

    private _cuisine: Array<Option> = [];
    private _excludeCuisine: Array<Option> = [];
    private _diet: Array<Option> = [];
    private _intolerances: Array<Option> = [];

    private _stringOptions = normalizeFilter<StringStoreType>(stringFilters, '');
    private _numberOptions = normalizeFilter<NumberStoreType>(numberFilters, 0);
    private _booleanOptions = normalizeFilter<BooleanStoreType>(booleanFilters, false);
    private _minMaxOptions = normalizeFilter<MinMaxStoreType>(minMaxFilters, { min: 0, max: 0 });
    
    constructor() {
        makeObservable<FilterStore, PrivateFields>(this, {
            _searchField: observable,
            _category: observable.ref,
            _visibility: observable.ref,

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
            setVisibility: action.bound,

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
            visibility: computed,

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

    setVisibility(newValue: boolean) {
        this._visibility = newValue;
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
        if (this._stringOptions.entities[name]) {
            this._stringOptions.entities[name].value = newString;
        }
        this._stringOptions = { ...this._stringOptions };
    }

    setNumber(name: string, newNumber: number) {
        if (this._numberOptions.entities[name]) {
            this._numberOptions.entities[name].value = newNumber;
        }
        this._numberOptions = { ...this._numberOptions };
    }

    setBoolean(name: string, newBoolean: boolean) {
        if (this._booleanOptions.entities[name]) {
            this._booleanOptions.entities[name].value = newBoolean;
        }
    }

    setMinMax(name: string, newMinMax: { min: number, max: number }) {
        if (this._minMaxOptions.entities[name]) {
            this._minMaxOptions.entities[name].value.min = newMinMax.min;
            this._minMaxOptions.entities[name].value.max = newMinMax.max;
        }
    }

    get searchField() {
        return this._searchField;
    }

    get category() {
        return this._category;
    }

    get visibility() {
        return this._visibility;
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
        return linearizeCollection(this._stringOptions);
    }

    get numberValues() {
        return linearizeCollection(this._numberOptions);
    }

    get booleanValues() {
        return linearizeCollection(this._booleanOptions);
    }

    get minMaxValues() {
        return linearizeCollection(this._minMaxOptions);
    }

    destroy(): void {
        this._searchField = '';
        this._category = [];
    }
}
