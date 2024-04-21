import React, { useState } from "react";
import './ContentFilters.scss';

import Input from "components/Input";
import SearchIcon from "components/icons/SearchIcon";
import MultiDropdown, { Option } from "components/MultiDropdown";
import Button from "components/Button";

const ContentFilters: React.FC = () => {

    const [ search, setSearch ] = useState('');
    const options: Option[] = [];
    const value: Option[] = [];

    return (
        <div className="content-filters">
            <div className="content-filters-search">
                <Input 
                    className="content-filters-search-input"
                    value={search}
                    onChange={(e: any) => { setSearch(e.target.value) }}
                    placeholder="Enter dishes"
                />
                <Button><SearchIcon width='25' height='24' /></Button>
            </div>
            <div className="content-filters-category">
                <MultiDropdown 
                    className="content-filters-category-block"
                    options={options}
                    value={value}
                    onChange={(value) => value}
                    getTitle={(value) => 'Categories'}
                />
            </div>
        </div>
    )
}

export default ContentFilters;