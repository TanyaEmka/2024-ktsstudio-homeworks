import { observer } from "mobx-react-lite";
import * as React from "react";
import { useEffect } from "react";
import Button from "components/Button";
import Input from "components/Input";
import Text from "components/Text";
import MultiDropdown, { Option } from "components/MultiDropdown";
import SearchIcon from "components/icons/SearchIcon";
import { useLocalStore } from "hooks/useLocalStore";
import FilterStore from "store/FilterStore";
import styles from './ContentFilters.module.scss';
import searchStore from "store/SearchParamsStore";

interface ContentFiltersProps {
    inputPlaceholder?: string,
    categoryTag?: string,
    categoryOptions?: Option[],
    categoryPlaceholder?: string,
}

const ContentFilters: React.FC<ContentFiltersProps> = (props) => {

    const filter = useLocalStore(() => new FilterStore());

    useEffect(() => {
        searchStore.getSearchParams();
    }, []);

    useEffect(() => {
        filter.setSearch(searchStore.getParam('query'));
        if (props.categoryTag && props.categoryOptions) {
            filter.setCategory(searchStore.getMultipleParam(
                props.categoryTag, 
                props.categoryOptions
            ));
        }
    }, [searchStore.searchParams, filter]);

    const changeSearchParams = () => {
        searchStore.changeSearchParamsForFilters(
            filter.searchField,
            props.categoryTag, filter.category,
        )
    }

    const onChangeInputHandle = (value: string) => {
        filter.setSearch(value);
    }

    const onChangeCategory = (value: Option[]) => { 
        filter.setCategory(value) 
    }

    const getTitleWithInit = (value: Option[], initValue: string) => {
        if (value.length > 0) {
            return value.map((elem) => elem.value).join(', ');
        }
        return initValue;
    }

    const getTitleCategory = (value: Option[]) => { 
        if (props.categoryPlaceholder) {
            return getTitleWithInit(value, props.categoryPlaceholder);
        }
        return '';
    }

    const showMoreFilters = () => {
        filter.setVisibility(true);
    }

    return (
        <div className={styles["content-filters"]}>
            <div className={styles["content-filters__search"]}>
                <Input 
                    className={styles["content-filters__search__input"]}
                    value={filter.searchField}
                    onChange={onChangeInputHandle}
                    placeholder={props.inputPlaceholder || 'Enter dishes'}
                />
                <Button onClick={changeSearchParams}>
                    <SearchIcon width='25' height='24' />
                </Button>
            </div>
            <div className={styles["content-filters__category"]}>
                <Text 
                    color="accent" 
                    view='p-16'
                    tag='div'
                    className={styles["content-filters__category__shower"]}
                    onCLick={showMoreFilters}
                >
                    <u>Show more filters</u>
                </Text>
                {props.categoryOptions && props.categoryPlaceholder && props.categoryTag &&
                <MultiDropdown 
                    className={styles["content-filters__category__block"]}
                    options={props.categoryOptions}
                    value={filter.category}
                    onChange={onChangeCategory}
                    getTitle={getTitleCategory}
                />
                }
            </div>
        </div>
    )
}

export default observer(ContentFilters);