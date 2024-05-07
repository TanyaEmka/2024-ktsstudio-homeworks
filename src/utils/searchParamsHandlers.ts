import { Option } from "components/MultiDropdown";

export const getOffset = (searchParams: URLSearchParams) => {
    return ((Number(searchParams.get('page') || '1') - 1) * 9).toString();    
}

export const getParamsString = (
    searchParams: URLSearchParams, 
    paramName: string
) => {
    return searchParams
        .getAll(paramName).map((value) => [paramName, value].join('=')).join('&') || '';       
}

export const getOptionsBySearchParam = (
    searchParams: URLSearchParams, 
    paramName: string,
    options: Array<Option>
) => {
    const values = searchParams.getAll(paramName);
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
    paramName: string
) => {
    return searchParams.get(paramName) || '';
}