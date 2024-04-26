import * as React from "react";
import { useState } from "react";

import Button from "components/Button";
import Input from "components/Input";
import MultiDropdown, { Option } from "components/MultiDropdown";
import SearchIcon from "components/icons/SearchIcon";
import styles from './ContentFilters.module.scss';

const ContentFilters: React.FC = () => {

    const [ search, setSearch ] = useState('');
    const options: Option[] = [];
    const value: Option[] = [];

    return (
        <div className={styles["content-filters"]}>
            <div className={styles["content-filters__search"]}>
                <Input 
                    className={styles["content-filters__search__input"]}
                    value={search}
                    onChange={(value) => { setSearch(value) }}
                    placeholder="Enter dishes"
                />
                <Button><SearchIcon width='25' height='24' /></Button>
            </div>
            <div className={styles["content-filters__category"]}>
                <MultiDropdown 
                    className={styles["content-filters__category__block"]}
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