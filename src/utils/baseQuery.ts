import axios from "axios";
import * as React from "react";
import { 
    LoadingStatus, 
    errorStatus, 
    SuccessfulStatus, 
} from "config/initValues";
import { Status } from "types/apiTypes";

export type QueryParameterType = {
    [key: string]: string | number | boolean | undefined | null
}

export type HookType<QueryType extends QueryParameterType, ResponseType> = (
    setData: (data: ResponseType) => void,
    setStatus: (status: Status) => void,
    parameters: { [K in keyof QueryType]: QueryType[K] },
    useEffectParams: Array<unknown>,
) => void;

export interface BQueryType {
    endPoints: {
        [key: string]: {
            response: object,
            path: QueryParameterType,
        }
    }
}

export type HookObjectType<T extends BQueryType> = {
    [K in keyof T['endPoints']]: 
        HookType<
            T['endPoints'][K]['path'], 
            T['endPoints'][K]['response']
        >
}

export type MethodType = 'get' | 'post' | 'put' | 'patch' | 'delete';

export interface BuilderInterface {
    baseUrl: string,
    endPoints: {
        [key: string]: {
            method: MethodType,
            response: object,
            parameters: QueryParameterType,
            getPath: (parameters: QueryParameterType) => string,
        }
    }
}

export class BQuery<T extends BQueryType> {

    hooks: HookObjectType<T>;

    constructor(hooks: HookObjectType<T>) {
        this.hooks = hooks;
    }

    destroy() {
        this.hooks = {} as HookObjectType<T>;
    }
};

export function configureQueryBox<T extends BuilderInterface>(builder: T): BQuery<{
    endPoints: {
        [K in keyof T['endPoints'] & string as `use${K}`]: {
            response: T['endPoints'][K]['response'],
            path: T['endPoints'][K]['parameters'],
        }
    }
}> {

    const hooks = {};
    Object.entries(builder.endPoints).forEach(([key, point]) => {
        Object.assign(hooks, {
            ['use' + key]: (
                setData: (data: typeof point.response) => void, 
                setStatus: (status: Status) => void, 
                parameters: typeof point.parameters,
                useEffectParams: Array<unknown>
            ) => {
                React.useEffect(() => {
                    const url = builder.baseUrl + point.getPath(parameters);
                    setStatus(LoadingStatus);
                    axios[point.method](url)
                    .then((resp) => {
                        setStatus(SuccessfulStatus);
                        setData(resp.data);
                    })
                    .catch((err) => {
                        setStatus(errorStatus(err.message));
                    })
                }, [...useEffectParams]);
            }
        });
    });

    return new BQuery(hooks as HookObjectType<{
        endPoints: {
            [K in keyof T['endPoints'] & string as `use${K}`]: {
                response: T['endPoints'][K]['response'],
                path: T['endPoints'][K]['parameters'],
            }
        }
    }>);
}

export function buildEndPoint<ResponseType extends object, ParametersType extends QueryParameterType>
(method: MethodType, getPath: (parameters: ParametersType) => string): {
    method: MethodType,
    response: ResponseType,
    parameters: ParametersType,
    getPath: (parameters: QueryParameterType) => string
} {

    const initParams = {} as ParametersType;
    const initResponse = {} as ResponseType;

    return {
        method: method,
        response: initResponse,
        parameters: initParams,
        getPath: getPath as (parameters: QueryParameterType) => string,
    }
}