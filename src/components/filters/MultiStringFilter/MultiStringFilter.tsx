import * as React from "react";
import MultiDropdown, { MultiDropdownProps } from "components/MultiDropdown";
import { MultiStringFilterType } from "types/filterTypes";
import Filter from "../Filter";


const MultiStringFilter: React.FC<MultiStringFilterType & MultiDropdownProps> = (props) => {

    const { 
        filterName,
        ...multiProps
    } = props;

    return (
        <Filter name={filterName}>
            <MultiDropdown {...multiProps} />
        </Filter>
    )
}

export default MultiStringFilter;