import axios from "axios";
import { action, computed, makeObservable, observable } from "mobx";
import { urlPrefix, apiKey, imagePrefix } from "config/api";
import { 
    IngredientInit, 
    NotStartedStatus, 
    LoadingStatus, 
    SuccessfulStatus, 
    errorStatus 
} from "config/initValues";
import { ILocalStore } from "hooks/useLocalStore";
import { IngredientType, Status } from "types/apiTypes";
import { Option } from "components/MultiDropdown";

type PrivateFields = '_status' | '_ingredient' | '_amount' | '_unit';

export default class IngredientStore implements ILocalStore {
    private _status: Status = NotStartedStatus;
    private _ingredient: IngredientType = IngredientInit;
    private _amount: string = '1.0';
    private _unit: Option[] = [];
    
    constructor() {
        makeObservable<IngredientStore, PrivateFields>(this, {
            _status: observable.ref,
            _ingredient: observable.ref,
            _amount: observable,
            _unit: observable,

            setStatus: action.bound,
            setIngredient: action.bound,
            setQueries: action.bound,
            loadingIngredient: action.bound,

            ingredient: computed,
            amount: computed,
            unit: computed,
            status: computed,
        })
    }

    setStatus(newStatus: Status) {
        this._status = { ...newStatus };
    }

    setIngredient(newIngredient: IngredientType) {
        this._ingredient = { ...newIngredient };
    }

    setQueries(amount: string, unit: Option[]) {
        this._amount = amount;
        this._unit = [ ...unit ];
    }

    loadingIngredient(
        id: number,
    ) {
        let url = urlPrefix + 'food/ingredients/' + id + '/information?';
        let queries: string[] = [];
        if (this._amount !== '') {
            queries.push(['amount', this._amount].join('='));
        }
        if (this._unit.length !== 0) {
            if (this._unit[0].value !== '') {
                queries.push(['unit', this._unit[0].value].join('='));
            }
        }
        queries.push(['apiKey', apiKey].join('='));
        url += queries.join('&');
        this.setStatus(LoadingStatus);
        axios.get(url)
        .then((resp) => {
            this.setStatus(SuccessfulStatus);
            this.setIngredient(resp.data);
        })
        .catch((err) => {
            this.setStatus(errorStatus(err.response.data.message));
        })
    }

    get ingredient() {
        return this._ingredient;
    }

    get amount() {
        return this._amount;
    }

    get unit() {
        return this._unit;
    }

    get status() {
        return this._status;
    }

    destroy(): void {
        this._ingredient = IngredientInit;
        this._status = NotStartedStatus;
    }
}