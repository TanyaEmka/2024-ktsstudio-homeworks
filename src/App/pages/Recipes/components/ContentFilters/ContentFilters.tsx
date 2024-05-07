import { observer } from "mobx-react-lite";
import * as React from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Button from "components/Button";
import Input from "components/Input";
import MultiDropdown, { Option } from "components/MultiDropdown";
import SearchIcon from "components/icons/SearchIcon";
import { mealTypesOptions } from "config/api";
import { useLocalStore } from "hooks/useLocalStore";
import FilterStore from "store/FilterStore";
import { getSearchParam, getOptionsBySearchParam } from "utils/searchParamsHandlers";
import styles from './ContentFilters.module.scss';

const ContentFilters: React.FC = () => {

    const [searchParams, setParams] = useSearchParams();
    const { 
        searchField, category, 
        setSearch, setCategory 
    } = useLocalStore(() => new FilterStore());

    useEffect(() => {
        setSearch(getSearchParam(searchParams, 'query'));
        setCategory(getOptionsBySearchParam(searchParams, 'type', mealTypesOptions));
    }, []);

    const onChangeInputHandle = (value: string) => {
        setSearch(value);
    }

    const changeSearchParams = () => {
        searchParams.delete('query');
        searchParams.delete('type');
        if (searchField !== '') {
            searchParams.set('query', searchField);
        }
        category.forEach((cat) => {
            searchParams.append('type', cat.value);
        })
        setParams(searchParams);
    }

    const onChangeMultiDropdownHandle = (value: Option[]) => {
        setCategory(value);
    }

    const getTitleFunction = (value: Option[]) => {
        if (value.length > 0) {
            return value.map((elem) => elem.value).join(', ');
        }
        return 'Categories';
    }

    return (
        <div className={styles["content-filters"]}>
            <div className={styles["content-filters__search"]}>
                <Input 
                    className={styles["content-filters__search__input"]}
                    value={searchField}
                    onChange={onChangeInputHandle}
                    placeholder="Enter dishes"
                />
                <Button onClick={changeSearchParams}>
                    <SearchIcon width='25' height='24' />
                </Button>
            </div>
            <div className={styles["content-filters__category"]}>
                <MultiDropdown 
                    className={styles["content-filters__category__block"]}
                    options={mealTypesOptions}
                    value={category}
                    onChange={onChangeMultiDropdownHandle}
                    getTitle={getTitleFunction}
                />
            </div>
        </div>
    )
}

export default observer(ContentFilters);