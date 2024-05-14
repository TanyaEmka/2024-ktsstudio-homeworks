import * as React from "react";
import Filter from "../Filter";
import { BooleanFilterType } from "types/filterTypes";

import CheckBox, { CheckBoxProps } from "components/CheckBox";

const BooleanFilter: React.FC<BooleanFilterType & CheckBoxProps> = (props) => {

    const { filterName, ...checkboxProps } = props;

    return (
        <Filter name={filterName}>
            <CheckBox {...checkboxProps} />
        </Filter>
    )
}

export default BooleanFilter;