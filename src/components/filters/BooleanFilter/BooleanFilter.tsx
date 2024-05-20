import * as React from "react";
import CheckBox, { CheckBoxProps } from "components/CheckBox";
import { BooleanFilterType } from "types/filterTypes";
import Filter from "../Filter";


const BooleanFilter: React.FC<BooleanFilterType & CheckBoxProps> = (props) => {

    const { filterName, ...checkboxProps } = props;

    return (
        <Filter name={filterName}>
            <CheckBox {...checkboxProps} />
        </Filter>
    )
}

export default BooleanFilter;