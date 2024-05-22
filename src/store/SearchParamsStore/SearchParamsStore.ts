import { action, computed, makeObservable, observable } from "mobx";
import { Option } from "components/MultiDropdown";
import { ILocalStore } from "hooks/useLocalStore";

type SearchParamObjType = {
    [key: string]: string | null,
}

type PrivateFields = '_searchParams';

class SearchParamsStore implements ILocalStore {
    private _searchParams: SearchParamObjType = {};
    
    constructor() {
        makeObservable<SearchParamsStore, PrivateFields>(this, {
            _searchParams: observable.ref,

            setSearchParam: action.bound,
            getSearchParams: action.bound,
            setMultiParam: action.bound,
            deleteSearchParam: action.bound,

            changeSearchParamsForFilters: action.bound,
            changeParamArray: action.bound,
            clear: action.bound,

            searchParams: computed,
            searchParamsString: computed,
            searchParamURL: computed,
        });
    }

    getSearchParams(searchParams: URLSearchParams) {
        this._searchParams = {};
        const paramArray = Array.from(searchParams.entries());
        paramArray.forEach(([key, value]) => {
            Object.assign(this._searchParams, {
                [key]: decodeURIComponent(value)
            })
        });
    }

    setSearchParam(
        key: string, 
        value: string | null, 
    ) {
        if (value) {
            Object.assign(this._searchParams, {
                [key]: value,
            });
            this._searchParams = { ...this._searchParams };
        }
    }

    deleteSearchParam(key: string) {
        if (key in this._searchParams) {
            this._searchParams[key] = null;
        }
    }

    setMultiParam(
        key: string, 
        values: string[], 
        prefix: string = ',',
    ) {
        const valueStr = values.join(prefix);
        if (valueStr !== '') {
            Object.assign(this._searchParams, {
                [key]: valueStr,
            });
            this._searchParams = { ...this._searchParams };
        }
    }

    changeParamArray (
        ...tags: [string, string][]
    ) {
        tags.forEach(([key, value]) => {
            if (key !== '') {
                this.deleteSearchParam(key);
            }
            if (key !== '' && value !== '') {
                this.setSearchParam(key, value);
            }
        });
        this._searchParams = { ...this._searchParams };
    }

    changeSearchParamsForFilters (
        search: string,
        categoryTag?: string,
        category?: Option[],
        otherTags?: [string, string][]
    ) {
        this.deleteSearchParam('query');
        this.deleteSearchParam('page');
        if (search !== '') {
            this.setSearchParam('query', search);
        }
        if (categoryTag && category) {
            this.deleteSearchParam(categoryTag);
            this.setMultiParam(categoryTag, category.map((cat) => cat.value), ',');
        }
        if (otherTags) {
            otherTags.forEach(([key, value]) => {
                if (key !== '') {
                    this.deleteSearchParam(key);
                }
                if (key !== '' && value !== '') {
                    this.setSearchParam(key, value);
                }
            })
        }
        this._searchParams = { ...this._searchParams };
    }

    getParam(key: string): string {
        return this._searchParams[key] || '';
    }

    getNumberParam(key: string, init: number = 1): number {
        const value = Number(this._searchParams[key]);
        return !isNaN(value) ? value : init;
    }

    getParamPair(key: string): [string, string | null] {
        return [key, this._searchParams[key] || ''];
    }

    getOffset() {
        return ((Number(this._searchParams['page'] || '1') - 1) * 9).toString();
    }
    
    getMultipleParam(
        key: string, 
        options: Option[],
        prefix: string = ','
    ): Option[] {
        const valueStr = this._searchParams[key] || '';
        if (valueStr === '') {
            return [];
        }
        const valueArray = valueStr.split(prefix);
        return options.filter((opt) => {
            const index = valueArray.indexOf(opt.value.toLowerCase());
            return index !== -1;
        })
    }

    get searchParamsString() {
        let result: string[] = [];
        Object.entries(this._searchParams).forEach(([key, value]) => {
            if (value) {
                result.push([key, value].join('='));
            }
        });
        return result.join('&');
    }

    get searchParamURL() {
        return new URLSearchParams(this.searchParamsString);
    }
    
    get searchParams() {
        return this._searchParams;
    }

    clear() {
        Object.keys(this._searchParams).map((key) => {
            this.deleteSearchParam(key);
        })
        this._searchParams = { ...this._searchParams };
    }

    destroy(): void {
        this._searchParams = {};
    }
}

export default new SearchParamsStore();