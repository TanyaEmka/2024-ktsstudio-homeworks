import { ILocalStore } from "hooks/useLocalStore";
import { action, makeObservable, observable } from "mobx";
import { Status } from "types/apiTypes";
import axios from "axios";
import { LoadingStatus, NotStartedStatus, SuccessfulStatus, errorStatus } from "config/initValues";

type CookieObjectType = {
    [key: string]: string,
}

type UserStatusType = 'none' | 'auth';
type LoginRequestType = {
    username: string,
    firstName: string,
    lastName: string,
    email: string,
}
type LoginResponseType = {
    username: string,
    spoonacularPassword: string,
    hash: string,
}
type UserType = LoginRequestType & LoginResponseType; 

type PrivateFields = '_user' | '_userStatus' | '_status';
const initUser: UserType = {} as UserType;

export default class UserStore implements ILocalStore {

    private _user: UserType = initUser;
    private _userStatus: UserStatusType = 'none';
    private _status: Status = NotStartedStatus;

    constructor() {
        makeObservable<UserStore, PrivateFields>(this, {
            _user: observable.ref,
            _userStatus: observable,
            _status: observable.ref,
            setStatus: action.bound,
        });
    }

    setCookie(key: string, value: string, months: number = 3) {
        const cookieKey = encodeURIComponent(key);
        const cookieValue = encodeURIComponent(value);
        const cookieData = [cookieKey, cookieValue].join('=');
        let date = new Date();
        date.setMonth(date.getMonth() + months);
        const cookieExpires = ['expires', date.toUTCString()].join('=');
        document.cookie = 
            [cookieData, cookieExpires, 'secure', 'samesite=lax'].join('; ');
    }

    deleteCookie(key: string) {
        this.setCookie(key, '', 0);
    }

    parseCookie(): CookieObjectType {
        const cookieObj = {} as CookieObjectType;
        document.cookie.split('; ').forEach((cookie) => {
            const cookiePair = cookie.split('=').map((pairUnit) => decodeURIComponent(pairUnit));
            Object.assign(cookieObj, { [cookiePair[0]]: cookiePair[1] });
        });

        return cookieObj;
    }

    getCookieProperty(cookieObj: CookieObjectType, name: string) {
        return cookieObj[name] || '';
    }

    setUserData(user: UserType) {
        Object.entries(user).forEach(([key, value]) => {
            this.setCookie('_' + key, value);
        });
        this._user = { ...user };
        this._userStatus = 'auth';
    }

    deleteUserData() {
        Object.keys(this._user).forEach((key) => {
            this.deleteCookie('_' + key);
        });
        this._userStatus = 'none';
        this._user = initUser;
        this.setStatus(NotStartedStatus);
    }

    setStatus(newStatus: Status) {
        this._status = { ...newStatus };
    }

    login(user: LoginRequestType) {
        this._user = initUser;
        this._userStatus = 'none';
        this.setStatus(LoadingStatus);
        axios.post('', { ...user })
        .then((resp) => {
            const { status, ...userResp } = resp.data;
            if (status === 'success') {
                this.setStatus(SuccessfulStatus);
                const userResponse = userResp as LoginResponseType;
                this.setUserData({
                    ...userResponse, ...user
                });
            } else {
                this.setStatus(errorStatus(resp.data['message']));
            }
        })
        .catch((err) => {
            this.setStatus(errorStatus(err.message));
        });
    }

    getCookies() {
        const cookieObj = this.parseCookie();
        Object.keys(this._user).forEach((key) => {
            this._user[key as keyof UserType] = this.getCookieProperty(cookieObj, '_' + key);
        });
        if (this._user.hash !== '') {
            this._userStatus = 'auth';
        }
    }

    logout() {
        this.deleteUserData();
    }

    destroy(): void {
        this._user = initUser;
        this._userStatus = 'none';        
        this._status = NotStartedStatus;
    }
}