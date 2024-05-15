export type FilterValueType = string | number | boolean;

export type FilterUnitType = {
    key: string | number,
    value: FilterValueType
}

export interface FilterType {
    filterName: string,
    filterSettings?: {
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

export interface FilterStoreType {
    name: string,
    value: 
        number | 
        boolean | 
        string | 
        {
            [key: string]: number | boolean | string
        }
}

export interface NumberStoreType extends FilterStoreType {
    name: string,
    value: number,
}

export interface BooleanStoreType extends FilterStoreType {
    name: string,
    value: boolean,
}

export interface StringStoreType extends FilterStoreType {
    name: string,
    value: string,
}

export interface MinMaxStoreType extends FilterStoreType {
    name: string,
    value: {
        min: number, max: number
    }
}