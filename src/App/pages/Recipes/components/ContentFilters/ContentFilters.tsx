import * as React from "react";
import { useState } from "react";
import Button from "components/Button";
import Input from "components/Input";
import MultiDropdown, { Option } from "components/MultiDropdown";
import SearchIcon from "components/icons/SearchIcon";
import styles from './ContentFilters.module.scss';

interface ContentFiltersProps {
    search: string,
    category?: string,
    setSearch: (value: string) => void,
    setCategory?: (value: string) => void,
}

const mealTypes = ['main course', 
                    'side dish',
                    'dessert',
                    'appetizer',
                    'salad',
                    'bread',
                    'breakfast',
                    'soup',
                    'beverage',
                    'sauce',
                    'marinade',
                    'fingerfood',
                    'snack',
                    'drink'];

const ContentFilters: React.FC<ContentFiltersProps> = (props) => {
    const options: Option[] = mealTypes.map((type, index) => ({ key: index.toString(), value: type }));
    const [value, setValue] = useState<Option[]>([]);

    React.useEffect(() => {
        console.log(props.search);
    }, [props.search])

    return (
        <div className={styles["content-filters"]}>
            <div className={styles["content-filters__search"]}>
                <Input 
                    className={styles["content-filters__search__input"]}
                    value={props.search}
                    onChange={(value) => { props.setSearch(value) }}
                    placeholder="Enter dishes"
                />
                <Button><SearchIcon width='25' height='24' /></Button>
            </div>
            <div className={styles["content-filters__category"]}>
                <MultiDropdown 
                    className={styles["content-filters__category__block"]}
                    options={options}
                    value={value}
                    onChange={(value) => { setValue(value) }}
                    getTitle={(value) => { 
                        if (value.length > 0) {
                            return value.map((elem) => elem.value).join(', ');
                        }
                        return 'Categories';
                    }}
                />
            </div>
        </div>
    )
}

export default ContentFilters;