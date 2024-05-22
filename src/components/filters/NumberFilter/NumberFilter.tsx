import * as React from "react";

import Input, { InputProps } from "components/Input";
import Text from "components/Text";
import { NumberFilterType } from "types/filterTypes";
import Filter from "../Filter";

const NumberFilter: React.FC<NumberFilterType & InputProps> = (props) => {

    const { 
        filterName, 
        filterSettings, 
        ...inputProps 
    } = props;

    return (
        <Filter name={filterName}>
            <div className="filter-number">
                <Input {...inputProps} type='number' />
                <Text color='secondary'>
                    {filterSettings.unit}
                </Text>
            </div>
        </Filter>
    )
}

export default NumberFilter;