import { ILocalStore } from "hooks/useLocalStore";
import { makeObservable, observable, computed, action } from "mobx";

type PrivateFields = '_prevUrl' | '_currentUrl';

class UrlStore implements ILocalStore {

    private _prevUrl: string = '/';
    private _currentUrl: string = '/';

    constructor() {
        makeObservable<UrlStore, PrivateFields>(this, {
            _prevUrl: observable,
            _currentUrl: observable,

            prevUrl: computed,
            setCurrentUrl: action.bound
        });
    }

    get prevUrl() {
        return this._prevUrl || '/';
    }

    setCurrentUrl(newUrl: string) {
        this._prevUrl = this._currentUrl;
        this._currentUrl = newUrl;
    }

    destroy(): void {
        this._prevUrl = '/';
        this._currentUrl = '/';
    }
}

export default new UrlStore();