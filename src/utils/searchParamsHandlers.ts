import { Option } from "components/MultiDropdown";

export const getOffset = (searchParams: URLSearchParams) => {
    return ((Number(searchParams.get('page') || '1') - 1) * 9).toString();    
}

export const getParamsString = (
    searchParams: URLSearchParams, 
    paramName: string
): string | null => {
    return searchParams.get(paramName);
}

export const getOptionsBySearchParam = (
    searchParams: URLSearchParams, 
    paramName: string,
    options: Array<Option>,
    prefix: string = ','
) => {
    const valueName = searchParams.get(paramName) || '';
    const values = valueName.split(prefix);
    const firstCats: Option[] = [];
    values.forEach((value) => {
        const elemInd = options.map((opt) => opt.value).indexOf(value);
        if (elemInd !== -1) {
            firstCats.push(options[elemInd]);
        }
    });
    return firstCats;
}

export const getSearchParam = (
    searchParams: URLSearchParams, 
    paramName: string,
    initValue: string = '',
) => {
    return searchParams.get(paramName) || initValue;
}

export const getAllKeyValue = (
    searchParams: URLSearchParams,
): Array<[string, string | null]> => {
    return [ ...searchParams.entries() ];
}