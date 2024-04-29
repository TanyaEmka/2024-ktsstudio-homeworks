import * as React from "react";
import Button from "components/Button";
import Input from "components/Input";
import MultiDropdown, { Option } from "components/MultiDropdown";
import SearchIcon from "components/icons/SearchIcon";
import styles from './ContentFilters.module.scss';
import { mealTypes } from "config/api";
import { useSearchParams } from "react-router-dom";

const ContentFilters: React.FC = () => {
    const options: Option[] = mealTypes
        .map((type, index) => ({ key: index.toString(), value: type }));

    const getFirstState = () => {
        let values = searchParams.getAll('type');
        let firstCats: Option[] = [];
        values.forEach((value) => {
            const elemInd = options.map((opt) => opt.value).indexOf(value);
            if (elemInd !== -1) {
                firstCats.push(options[elemInd]);
            }
        });
        return firstCats;
    }

    const [searchParams, setParams] = useSearchParams();
    const [search, setSearch] = React.useState(searchParams.get('query') || '');
    const [category, setCategory] = React.useState<Option[]>(getFirstState());

    return (
        <div className={styles["content-filters"]}>
            <div className={styles["content-filters__search"]}>
                <Input 
                    className={styles["content-filters__search__input"]}
                    value={search}
                    onChange={(value) => { setSearch(value) }}
                    placeholder="Enter dishes"
                />
                <Button
                    onClick={() => {
                        searchParams.delete('query');
                        searchParams.delete('type');
                        if (search !== '') {
                            searchParams.set('query', search);
                        }
                        category.forEach((cat) => {
                            searchParams.append('type', cat.value);
                        })
                        setParams(searchParams);
                    }}
                >
                    <SearchIcon width='25' height='24' />
                </Button>
            </div>
            <div className={styles["content-filters__category"]}>
                <MultiDropdown 
                    className={styles["content-filters__category__block"]}
                    options={options}
                    value={category}
                    onChange={(value) => { setCategory(value) }}
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