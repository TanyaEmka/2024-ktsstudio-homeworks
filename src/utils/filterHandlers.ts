import { Option } from "components/MultiDropdown";
import { FilterStoreType } from "types/filterTypes";
import { normalizeCollection } from "./collection";

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

export function normalizeFilter<T extends FilterStoreType>(
    arr: string[],
    initialValue: T['value']
) {
    const tArray = getStoreFilterArr(arr, initialValue);
    return normalizeCollection(tArray, (element) => element.name);
}