import * as React from "react";
import { useState } from "react";
import './ContentFilters.scss';

import Button from "components/Button";
import Input from "components/Input";
import MultiDropdown, { Option } from "components/MultiDropdown";
import SearchIcon from "components/icons/SearchIcon";

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
                    onChange={(value) => { setSearch(value) }}
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
                    getTitle={() => 'Categories'}
                />
            </div>
        </div>
    )
}

export default ContentFilters;