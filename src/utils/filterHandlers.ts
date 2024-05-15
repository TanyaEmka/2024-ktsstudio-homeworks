import { Option } from "components/MultiDropdown";
import { FilterStoreType } from "types/filterTypes";

export function createOptionList(arr: string[]): Option[] {
    return arr
        .map((type, index) => ({ key: index.toString(), value: type }));
}

export function getStoreFilterArr<T extends FilterStoreType>(
    arr: string[], 
    initialValue: T['value']
): T[] {
    return arr
        .map((key) => {
            return ({
                name: key, value: initialValue
            })
        }) as T[];
}

export function getValueByName<T extends FilterStoreType>(
    arr: T[], 
    name: string
): T | undefined {
    return arr.find((arrObj) => arrObj.name === name);   
}

export function getIndexByName<T extends FilterStoreType>(
    arr: T[], 
    name: string
): number {
    return arr.map((arrObj) => arrObj.name).indexOf(name);
}