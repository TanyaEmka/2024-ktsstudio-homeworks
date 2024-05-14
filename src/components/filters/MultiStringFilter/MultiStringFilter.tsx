import * as React from "react";
import { MultiStringFilterType } from "types/filterTypes";
import Filter from "../Filter";

import MultiDropdown, { MultiDropdownProps } from "components/MultiDropdown";

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