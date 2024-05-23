import { ILocalStore } from "hooks/useLocalStore";
import { makeObservable, observable, computed, action } from "mobx";

type PrivateFields = '_prevUrl' | '_currentUrl';

class UrlStore implements ILocalStore {

    private _prevUrl: string = 'none';
    private _currentUrl: string = 'none';

    constructor() {
        makeObservable<UrlStore, PrivateFields>(this, {
            _prevUrl: observable,
            _currentUrl: observable,

            prevUrl: computed,
            realPrevUrl: computed,
            currentUrl: computed,
            setCurrentUrl: action.bound
        });
    }

    get prevUrl() {
        if (this._prevUrl === 'none') {
            return '/';
        }
        return this._prevUrl;
    }

    get realPrevUrl() {
        return this._prevUrl;
    }

    get currentUrl() {
        return this._currentUrl || '/';
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