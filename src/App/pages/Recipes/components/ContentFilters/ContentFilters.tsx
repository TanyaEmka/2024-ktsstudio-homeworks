import { observer } from "mobx-react-lite";
import * as React from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Button from "components/Button";
import Input from "components/Input";
import MultiDropdown, { Option } from "components/MultiDropdown";
import SearchIcon from "components/icons/SearchIcon";
import { useLocalStore } from "hooks/useLocalStore";
import FilterStore from "store/FilterStore";
import { getSearchParam, getOptionsBySearchParam } from "utils/searchParamsHandlers";
import styles from './ContentFilters.module.scss';

import MultiStringFilter from "components/filters/MultiStringFilter";
import { createOptionList } from "utils/filterHandlers";
import { 
    mealTypesOptions, cuisineList,
    dietList, intoleranceList,
} from "config/api";

const ContentFilters: React.FC = () => {

    const [searchParams, setParams] = useSearchParams();
    const { 
        searchField, category, 
        setSearch, setCategory,
        cuisine, excludeCuisine,
        setCuisine, setExcludeCuisine,
        diet, intolerances,
        setDiet, setIntolerances, 
    } = useLocalStore(() => new FilterStore());

    useEffect(() => {
        setSearch(getSearchParam(searchParams, 'query'));
        setCategory(getOptionsBySearchParam(searchParams, 'type', mealTypesOptions));
        setCuisine(getOptionsBySearchParam(searchParams, 'cuisine', createOptionList(cuisineList)));
        setExcludeCuisine(getOptionsBySearchParam(searchParams, 'excludeCuisine', createOptionList(cuisineList)));
        setDiet(getOptionsBySearchParam(searchParams, 'diet', createOptionList(dietList)));
        setIntolerances(getOptionsBySearchParam(searchParams, 'intolerances', createOptionList(intoleranceList)));

    }, [searchParams, setSearch, setCategory]);

    const onChangeInputHandle = (value: string) => {
        setSearch(value);
    }

    const setMultiParam = (
        paramName: string,
        paramValues: Option[],
        prefix: string = ','
    ) => {
        if (paramValues.length !== 0) {
            const endValue = paramValues.map((opt) => opt.value).join(prefix);
            searchParams.set(paramName, endValue);
        }
    }

    const changeSearchParams = () => {
        searchParams.delete('query');
        searchParams.delete('type');
        searchParams.delete('page');
        if (searchField !== '') {
            searchParams.set('query', searchField);
        }
        setMultiParam('type', category);
        setMultiParam('cuisine', cuisine);
        setMultiParam('excludeCuisine', excludeCuisine);
        setMultiParam('diet', diet);
        setMultiParam('intolerances', intolerances);
        setParams(searchParams);
    }

    const onChangeCategory = (value: Option[]) => { setCategory(value) }
    const onChangeCuisine = (value: Option[]) => { setCuisine(value) }
    const onChangeExcludedCuisine = (value: Option[]) => { setExcludeCuisine(value) }
    const onChangeDiet = (value: Option[]) => { setDiet(value) }
    const onChangeIntolerances = (value: Option[]) => { setIntolerances(value) }

    const getTitleWithInit = (value: Option[], initValue: string) => {
        if (value.length > 0) {
            return value.map((elem) => elem.value).join(', ');
        }
        return initValue;
    }

    const getTitleCategory = (value: Option[]) => 
        getTitleWithInit(value, 'Categories');

    const getTitleCuisine = (value: Option[]) => 
        getTitleWithInit(value, 'Cuisine');

    const getTitleExcludedCuisine = (value: Option[]) => 
        getTitleWithInit(value, 'Excluded categories');

    const getTitleDiet = (value: Option[]) => 
        getTitleWithInit(value, 'Diet');

    const getTitleIntolerances = (value: Option[]) => 
        getTitleWithInit(value, 'Intolerances');

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
                    onChange={onChangeCategory}
                    getTitle={getTitleCategory}
                />
            </div>
            <div className={styles["content-filters__other"]}>
                <MultiStringFilter 
                    filterName="cuisine"
                    className={styles["content-filters__category__block"]}
                    options={createOptionList(cuisineList)}
                    value={cuisine}
                    onChange={onChangeCuisine}
                    getTitle={getTitleCuisine}
                />
                <MultiStringFilter 
                    filterName="excludeCuisine"
                    className={styles["content-filters__category__block"]}
                    options={createOptionList(cuisineList)}
                    value={excludeCuisine}
                    onChange={onChangeExcludedCuisine}
                    getTitle={getTitleExcludedCuisine}
                />
                <MultiStringFilter 
                    filterName="diet"
                    className={styles["content-filters__category__block"]}
                    options={createOptionList(dietList)}
                    value={diet}
                    onChange={onChangeDiet}
                    getTitle={getTitleDiet}
                />
                <MultiStringFilter 
                    filterName="intolerances"
                    className={styles["content-filters__category__block"]}
                    options={createOptionList(intoleranceList)}
                    value={intolerances}
                    onChange={onChangeIntolerances}
                    getTitle={getTitleIntolerances}
                />
            </div>
        </div>
    )
}

export default observer(ContentFilters);