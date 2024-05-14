export type FilterValueType = string | number | boolean;

export type FilterUnitType = {
    key: string | number,
    value: FilterValueType
}

export interface FilterType {
    filterName: string,
    filterSettings: {
        [key: string]: 
            FilterValueType | 
            FilterValueType[] | 
            FilterUnitType | 
            FilterUnitType[]
    }
}

export interface StringFilterType extends FilterType {
    filterName: string,
    filterSettings: { help: string }
}

export interface MultiStringFilterType extends FilterType {
    filterName: string,
}

export interface NumberFilterType extends FilterType {
    filterName: string,
    filterSettings: { unit: string }
}

export interface MinMaxFilterType extends FilterType {
    filterName: string,
    filterSettings: { unit: string }
}

export interface BooleanFilterType extends FilterType {
    filterName: string,
}