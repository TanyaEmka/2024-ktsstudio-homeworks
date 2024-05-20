import { action, computed, makeObservable, observable } from "mobx";
import { Option } from "components/MultiDropdown";
import { ILocalStore } from "hooks/useLocalStore";

type PrivateFields = 
    '_searchField' | 
    '_category' | 
    '_visibility' |
    '_itemSingleList' |
    '_itemMinMaxList' |
    '_itemOptionList' |
    '_itemIndexList';

export type FilterItemTypes = 
    'STRING' | 
    'NUMBER' | 
    'BOOLEAN' | 
    'MINMAX' |
    'OPTION';

export type FilterStoreConfigType = {
    [key: string]: FilterItemTypes
}

type FilterSingleItemType = string;
type FilterMinMaxItemType = [string, string];
type FilterOptionItemType = Option[];

type FilterItemPointListType = {
    [key: string]: {
        point: number,
        type: FilterItemTypes
    },
}

export default class FilterStore implements ILocalStore {
    private _searchField = '';
    private _category: Array<Option> = [];
    private _visibility: boolean = false;

    private _itemIndexList: FilterItemPointListType = {};
    private _itemSingleList: FilterSingleItemType[] = [];
    private _itemMinMaxList: FilterMinMaxItemType[] = [];
    private _itemOptionList: FilterOptionItemType[] = [];

    constructor() {
        makeObservable<FilterStore, PrivateFields>(this, {
            _searchField: observable,
            _category: observable.ref,
            _visibility: observable.ref,
            _itemIndexList: observable.ref,
            _itemSingleList: observable.ref,
            _itemMinMaxList: observable.ref,
            _itemOptionList: observable.ref,

            setSearch: action.bound,
            setCategory: action.bound,
            setVisibility: action.bound,

            setSingleItemValue: action.bound,
            setMinMaxItemValue: action.bound,
            setOptionItemValue: action.bound,
            addMinMaxItem: action.bound,
            configFilters: action.bound,

            searchField: computed,
            category: computed,
            visibility: computed,
            isEmpty: computed,
            options: computed,
            minMaxes: computed,
        });
    }

    configFilters(filters: FilterStoreConfigType) {
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== 'OPTION' && value !== 'MINMAX') {
                this._itemSingleList.push('');
                Object.assign(this._itemIndexList, {
                    [key]: {
                        point: this._itemSingleList.length - 1,
                        type: value
                    }
                });
            } else if (value !== 'MINMAX') {
                this._itemOptionList.push([]);
                Object.assign(this._itemIndexList, {
                    [key]: {
                        point: this._itemOptionList.length - 1,
                        type: value
                    }
                });
            }
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

    get searchField() {
        return this._searchField;
    }

    get category() {
        return this._category;
    }

    get visibility() {
        return this._visibility;
    }

    get isEmpty() {
        return Object.keys(this._itemIndexList).length === 0;
    }

    get options() {
        return this._itemOptionList;
    }

    get minMaxes() {
        return this._itemMinMaxList;
    }

    getSingleItemValue(name: string): string {
        return this._itemSingleList[this._itemIndexList[name].point] || '';
    }

    getMinMaxItemValue(name: string): [string, string] {
        return this._itemMinMaxList[this._itemIndexList[name].point] || ['', ''];
    }

    getOptionItemValue(name: string): Option[] {
        return this._itemOptionList[this._itemIndexList[name].point] || [];
    }

    isSingle(name: string): boolean {
        return (
            this._itemIndexList[name].type !== 'OPTION' &&
            this._itemIndexList[name].type !== 'MINMAX'
        )
    }

    setSingleItemValue(name: string, value: string) {
        if (name in this._itemIndexList) {
            const itemPoint = this._itemIndexList[name].point;
            if (this.isSingle(name)) {
                this._itemSingleList[itemPoint] = value;
                this._itemSingleList = [ ...this._itemSingleList ];
            }
        }
        this._itemSingleList = [ ...this._itemSingleList ];
    }

    setMinMaxItemValue(name: string, value: string, position: number) {
        if (name in this._itemIndexList) {
            const itemPoint = this._itemIndexList[name].point;
            if (this._itemIndexList[name].type === 'MINMAX') {
                this._itemMinMaxList[itemPoint][position] = value;
                this._itemMinMaxList = [ ...this._itemMinMaxList ];
            }
        }
        this._itemMinMaxList = [ ...this._itemMinMaxList ];
    }

    addMinMaxItem(name: string) {
        this._itemMinMaxList.push(['', '']);
        Object.assign(this._itemIndexList, {
            [name]: {
                point: this._itemMinMaxList.length - 1,
                type: 'MINMAX'
            }
        });
        this._itemMinMaxList = [ ...this._itemMinMaxList ];
        this._itemIndexList = { ...this._itemIndexList };
    }

    setOptionItemValue(name: string, value: Option[]) {
        if (name in this._itemIndexList) {
            const itemPoint = this._itemIndexList[name].point;
            if (this._itemIndexList[name].type === 'OPTION') {
                this._itemOptionList[itemPoint] = [ ...value ];
                this._itemOptionList = [ ...this._itemOptionList ];
            }
        }
        this._itemOptionList = [ ...this._itemOptionList ];
    }

    destroy(): void {
        this._searchField = '';
        this._category = [];
        this._visibility = false;
        this._itemSingleList = [];
        this._itemMinMaxList = [];
        this._itemOptionList = [];
        this._itemIndexList = {};
    }
}
