export const getOffset = (searchParams: URLSearchParams) => {
    return ((Number(searchParams.get('page') || '1') - 1) * 9).toString();    
}

export const getTypeString = (searchParams: URLSearchParams) => {
    return searchParams
        .getAll('type').map((value) => ['type', value].join('=')).join('&') || '';       
}