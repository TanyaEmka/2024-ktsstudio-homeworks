import { observer } from "mobx-react-lite";
import * as React from "react";
import { useEffect } from "react";
import Button from "components/Button";
import Input from "components/Input";
import MultiDropdown, { Option } from "components/MultiDropdown";
import SearchIcon from "components/icons/SearchIcon";
import { useLocalStore } from "hooks/useLocalStore";
import FilterStore from "store/FilterStore";
import styles from './ContentFilters.module.scss';
import searchParamsStore from "store/SearchParamsStore";

import { 
    mealTypesOptions
} from "config/api";

const ContentFilters: React.FC = () => {

    const filter = useLocalStore(() => new FilterStore());

    useEffect(() => {
        console.log(searchParamsStore.searchParams);
    }, [searchParamsStore.searchParams]);

    useEffect(() => {
        filter.setSearch(searchParamsStore.getParam('query'));
        filter.setCategory(searchParamsStore.getMultipleParam('type', mealTypesOptions));
    }, [searchParamsStore.searchParams, filter]);

    const onChangeInputHandle = (value: string) => {
        filter.setSearch(value);
    }

    const changeSearchParams = () => {
        searchParamsStore.changeSearchParamsForRecipes(
            filter.searchField,
            filter.category,
        )
    }

    const onChangeCategory = (value: Option[]) => { filter.setCategory(value) }

    const getTitleWithInit = (value: Option[], initValue: string) => {
        if (value.length > 0) {
            return value.map((elem) => elem.value).join(', ');
        }
        return initValue;
    }

    const getTitleCategory = (value: Option[]) => 
        getTitleWithInit(value, 'Categories');

    return (
        <div className={styles["content-filters"]}>
            <div className={styles["content-filters__search"]}>
                <Input 
                    className={styles["content-filters__search__input"]}
                    value={filter.searchField}
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
                    value={filter.category}
                    onChange={onChangeCategory}
                    getTitle={getTitleCategory}
                />
            </div>
        </div>
    )
}

export default observer(ContentFilters);