import * as React from "react";
import { Status } from "config/apiTypes";
import { LoadingStatus, SuccessfulStatus, errorStatus } from "config/initValues";
import axios from "axios";

type QueryPoint = {
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    path: (...args: Array<string | number | boolean>) => string,
}

type QueryPointListType = {
    [key: string]: QueryPoint,
}

type HookListType = {
    [key: string]: (
        setData: (data: any) => void,
        setStatus: (status: Status) => void,
        ...args: Array<string | number | boolean>
    ) => void
}

interface QueryProps {
    baseQuery: string,
    points: QueryPointListType    
}

export default class BaseQuery {

    readonly _baseQuery: string;
    public _queries: HookListType = {};

    constructor(params: QueryProps) {
        this._baseQuery = params.baseQuery;
        Object.entries(params.points).forEach(([key, point]) => {
            this._queries['use' + key] = (
                setData: (data: any) => void,
                setStatus: (status: Status) => void,
                ...args: Array<string | number | boolean>
            ) => {
                React.useEffect(() => {
                    setStatus(LoadingStatus);
                    axios[point.method](this._baseQuery + point.path(...args))
                    .then((resp) => {
                        console.log(resp);
                        setStatus(SuccessfulStatus);
                        setData(resp.data);
                    })
                    .catch((err) => {
                        setStatus(errorStatus(err.message));
                    })
                }, [...args]);
            }
        });
    }

};