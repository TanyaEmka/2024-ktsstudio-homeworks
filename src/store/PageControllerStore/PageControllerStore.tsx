import { action, computed, makeObservable, observable } from "mobx";
import { ILocalStore } from "hooks/useLocalStore";

type PrivateFields = '_total' | '_pages';

export default class PageControllerStore implements ILocalStore {
    private _pages: number = 9;
    private _total: number = 0;
    
    constructor(totalResults: number) {
        makeObservable<PageControllerStore, PrivateFields>(this, {
            _total: observable,
            _pages: observable,
            getPointsArray: action.bound,
            pages: computed,
            total: computed,
        });

        this._total = Math.floor(totalResults / this._pages + (totalResults % this._pages !== 0 ? 1 : 0));;
    }

    getPointsArray(selectedPage: number) {
        if (this._total < this._pages) {
            return Array.from({length: this._total}, (_, index) => index + 1);
        } else {
            const endItem = Math.min(this._pages + selectedPage - (selectedPage % 3 !== 0 ? selectedPage % 3 : 3), this._total);
            let firstItem = selectedPage;
            if (selectedPage % 3 === 1) {
                firstItem = selectedPage;
            } else if (selectedPage % 3 === 2) {
                firstItem = selectedPage - 1;
            } else {
                firstItem = selectedPage - 2;
            }
            if (endItem - firstItem + 1 >= this._pages) {
                return [firstItem, firstItem + 1, firstItem + 2, 0, endItem];
            }
            return Array.from({length: endItem - firstItem + 1}, (_, index) => index + firstItem);
        }
    }

    get pages() {
        return this._pages;
    }

    get total() {
        return this._total;
    }

    destroy(): void {
        this._pages = 9;
    }
}