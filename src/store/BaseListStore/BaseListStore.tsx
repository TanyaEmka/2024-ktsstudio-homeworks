import { 
    NotStartedStatus, LoadingStatus,
    SuccessfulStatus, errorStatus
} from "config/initValues";
import { Status } from "types/apiTypes";
import { ILocalStore } from "hooks/useLocalStore";
import { getInitialCollectionModel, linearizeCollection, normalizeCollection } from "utils/collection";
import { makeObservable, observable, computed, action } from "mobx";
import axios from "axios";

type PrivateFields = '_status' | '_results' | '_total';

interface ListUnit { id: number }
type UrlFunctionProp = string | number | boolean | Array<[string, string | null]>;
export interface UrlGeneratorInterface {
    [key: string]: UrlFunctionProp,
}

export default class BaseListStore<
    ResultUnit extends ListUnit, 
> implements ILocalStore {
    
    protected _status: Status = NotStartedStatus;
    protected _results = getInitialCollectionModel<number, ResultUnit>();
    protected _total: number = 0;

    constructor() {
        makeObservable<BaseListStore<ResultUnit>, PrivateFields>(this, {
            _status: observable.ref,
            _results: observable.ref,
            _total: observable,

            setStatus: action.bound,
            setResultRequest: action.bound,
            loadingList: action.bound,

            status: computed,
            results: computed,
            total: computed,
        });
    }

    setStatus(newStatus: Status) {
        this._status = { ...newStatus };
    }

    setResultRequest(newResultList: ResultUnit[], newTotal: number) {
        this._results = normalizeCollection(newResultList, (element) => element.id);
        this._total = newTotal;
    }

    loadingList(
        url: string,
        totalName: string = 'totalResults',
    ) {
        this.setStatus(LoadingStatus);
        axios.get(url)
        .then((resp) => {
            this.setStatus(SuccessfulStatus);
            this.setResultRequest(resp.data.results, resp.data[totalName]);
        })
        .catch((err) => {
            this.setStatus(errorStatus(err.message));
        })
    }

    get status() {
        return this._status;
    }

    get results() {
        return linearizeCollection(this._results);
    }

    get total() {
        return this._total;
    }

    destroy(): void {
        this._results = getInitialCollectionModel();
        this._total = 0;
        this._status = NotStartedStatus;
    }
};