import { action, computed, makeObservable, observable } from "mobx";
import { ILocalStore } from "hooks/useLocalStore";

type PrivateFields = '_items' | '_endItem';

export default class PageControllerStore implements ILocalStore {
    private _items: Array<number> = [1, 2, 3];
    private _endItem: number = 9;
    
    constructor() {
        makeObservable<PageControllerStore, PrivateFields>(this, {
            _items: observable.ref,
            _endItem: observable,
            setItems: action.bound,
            setEnd: action.bound,
            items: computed,
            endItem: computed,
        });
    }

    setItems(newItems: Array<number>) {
        this._items = [...newItems];
    }

    setEnd(newEnd: number) {
        this._endItem = newEnd;
    }

    get items() {
        return this._items;
    }

    get endItem() {
        return this._endItem;
    }

    destroy(): void {
        this._items = [1, 2, 3];
        this._endItem = 9;
    }
}