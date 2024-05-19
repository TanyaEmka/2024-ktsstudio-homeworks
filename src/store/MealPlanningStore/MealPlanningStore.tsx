import { ILocalStore } from "hooks/useLocalStore";
import { Status } from "types/apiTypes";
import { urlPrefix, apiKey } from "config/api";
import { MealPlanWeekType, MealPlanDayType } from "types/apiTypes";
import axios from "axios";
import { LoadingStatus, NotStartedStatus, SuccessfulStatus, errorStatus } from "config/initValues";
import { action, computed, makeObservable, observable } from "mobx";

type PrivateFields = '_status' | '_plan';

export default class MealPlanningStore implements ILocalStore {

    private _status: Status = NotStartedStatus;
    private _plan: MealPlanWeekType = {} as MealPlanWeekType;

    constructor() {
        makeObservable<MealPlanningStore, PrivateFields>(this, {
            _status: observable.ref,
            _plan: observable.ref,
            setStatus: action.bound,
            setPlan: action.bound,
            loadingPlan: action.bound,
            generatePlan: action.bound,
            addInPlan: action.bound,
            deleteFromPlan: action.bound,
            clearPlan: action.bound,
            status: computed,
            plan: computed,
            weekStart: computed,    
        });
    }

    setStatus(newStatus: Status) {
        this._status = { ...newStatus };
    }

    setPlan(weekPlan: MealPlanWeekType) {
        this._plan = { ...weekPlan };
    }

    getDateForm(dateObj: Date) {
        const date = dateObj.toLocaleDateString('fr-CA', { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit' });
        return date;
    }

    getStartOfWeek(dateObj: Date) {
        let date = new Date(dateObj);
        let day = date.getDay();
        console.log(day);
        const diff = date.getDate() - day + (day === 0 ? -6 : 1);
        return this.getDateForm(new Date(date.setDate(diff)));
    }

    loadingPlan(
        username: string,
        hash: string,
    ) {
        const date = this.getStartOfWeek(new Date());
        const url = 
            urlPrefix + 
            'mealplanner/' + 
            username + 
            '/week/' + date + 
            '?hash=' + hash +
            '&apiKey=' + apiKey; 
        this.setStatus(LoadingStatus);
        axios.get(url)
        .then((resp) => {
            console.log(resp.data);
            this.setPlan(resp.data);
            this.setStatus(SuccessfulStatus);
        })
        .catch((err) => {
            this.setStatus(errorStatus(err.message));
        });
    }

    generatePlan(
        id: number, 
        username: string,
        hash: string
    ) {
        const nowPrev = this.getStartOfWeek(new Date());
        console.log(nowPrev);
        const now = new Date(nowPrev).getTime() / 1000;
        const url = 
            urlPrefix + 'mealplanner/' + 
            username + '/items?apiKey=' + apiKey +
            '&hash=' + hash;
        axios.post(url, {
            mealPlanTemplateId: id,
            startDate: now
        })
        .then((resp) => {
            console.log(resp.data);
            this.loadingPlan(username, hash);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    addInPlan() {

    }

    deleteFromPlan() {

    }

    clearPlan() {

    }

    get status() {
        return this._status;
    }

    get plan() {
        return this._plan;
    }

    get weekStart() {
        return this.getStartOfWeek(new Date());
    }

    destroy(): void {
        this._plan = {} as MealPlanWeekType;
        this._status = NotStartedStatus;
    }
};