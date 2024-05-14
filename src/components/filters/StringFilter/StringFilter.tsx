import * as React from "react";
import Filter from "../Filter";
import { StringFilterType } from "types/filterTypes";

import Input, { InputProps } from "components/Input";
import Text from "components/Text";

const StringFilter: React.FC<StringFilterType & InputProps> = (props) => {

    const { 
        filterName, 
        filterSettings,
        ...inputProps
    } = props;

    return (
        <Filter name={filterName}>
            <div className="filter-string">
                <Input {...inputProps} />
                <Text color='secondary'>
                    {filterSettings.help}
                </Text>
            </div>
        </Filter>
    )
}

export default StringFilter;