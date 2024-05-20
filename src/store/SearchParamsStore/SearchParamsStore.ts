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
            updateUrl: action.bound,
            updateSearchParams: action.bound,

            searchParams: computed,
        });
    }

    getSearchObject() {
        return new URLSearchParams(document.location.href.split('?')[1] || '');        
    }

    updateUrl(searchParams: URLSearchParams) {
        const newUrl = 
            window.location.protocol + '//' + 
            window.location.host + window.location.pathname + 
            '?' + searchParams.toString();
        window.history.pushState({path: newUrl}, '', newUrl);
    }

    updateSearchParams(): URLSearchParams {
        const searchParams = this.getSearchObject();
        Object.entries(this._searchParams).forEach(([key, value]) => {
            if (value) {
                searchParams.set(key, encodeURIComponent(value));
            } else {
                searchParams.delete(key);
            }
        });
        return searchParams;
    }

    getSearchParams() {
        this._searchParams = {};
        const searchParams = this.getSearchObject();
        const paramArray = Array.from(searchParams.entries());
        paramArray.forEach(([key, value]) => {
            Object.assign(this._searchParams, {
                [key]: decodeURIComponent(value)
            })
        });
    }

    setSearchParam(key: string, value: string | null, updating: boolean = true) {
        if (value) {
            Object.assign(this._searchParams, {
                [key]: value,
            });
            this._searchParams = { ...this._searchParams };
            if (updating) {
                const searchParams = this.getSearchObject();
                searchParams.set(key, encodeURIComponent(value.toLowerCase()));
                this.updateUrl(searchParams);
            }
        }
    }

    deleteSearchParam(key: string, updating: boolean = true) {
        if (key in this._searchParams) {
            this._searchParams[key] = null;
            if (updating) {
                const searchParams = this.getSearchObject();
                searchParams.delete(key);
                this.updateUrl(searchParams);
            }
        }
    }

    setMultiParam(
        key: string, 
        values: string[], 
        prefix: string = ',',
        updating: boolean = true,
    ) {
        const valueStr = values.join(prefix);
        if (valueStr !== '') {
            Object.assign(this._searchParams, {
                [key]: valueStr,
            });
            this._searchParams = { ...this._searchParams };
            if (updating) {
                const searchParams = this.getSearchObject();
                searchParams.set(key, encodeURIComponent(valueStr.toLowerCase()));
                this.updateUrl(searchParams);
            }
        }
    }

    changeSearchParamsForFilters(
        search: string,
        categoryTag?: string,
        category?: Option[],
        otherTags?: [string, string][]
    ) {
        this.deleteSearchParam('query', false);
        this.deleteSearchParam('page', false);
        if (search !== '') {
            this.setSearchParam('query', search, false);
        }
        if (categoryTag && category) {
            this.deleteSearchParam(categoryTag, false);
            this.setMultiParam(categoryTag, category.map((cat) => cat.value), ',', false);
        }
        if (otherTags) {
            otherTags.forEach(([key, value]) => {
                if (key !== '') {
                    this.deleteSearchParam(key, false);
                }
                if (key !== '' && value !== '') {
                    this.setSearchParam(key, value, false);
                }
            })
        }
        this.updateUrl(this.updateSearchParams());
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
    
    get searchParams() {
        return this._searchParams;
    }

    destroy(): void {
        this._searchParams = {};
    }
}

export default new SearchParamsStore();