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
import NumberFilter from "components/filters/NumberFilter";
import BooleanFilter from "components/filters/BooleanFilter";
import StringFilter from "components/filters/StringFilter";
import { createOptionList } from "utils/filterHandlers";
import { 
    mealTypesOptions, cuisineList,
    dietList, intoleranceList,
    booleanFilters, numberFilters,
    stringFilters, minMaxFilters
} from "config/api";
import MinMaxFilter from "components/filters/MinMaxFilter";

const ContentFilters: React.FC = () => {

    const [searchParams, setParams] = useSearchParams();
    const filter = useLocalStore(() => new FilterStore());

    useEffect(() => {
        filter.setSearch(getSearchParam(searchParams, 'query'));
        filter.setCategory(getOptionsBySearchParam(searchParams, 'type', mealTypesOptions));
        filter.setCuisine(getOptionsBySearchParam(searchParams, 'cuisine', createOptionList(cuisineList)));
        filter.setExcludeCuisine(getOptionsBySearchParam(searchParams, 'excludeCuisine', createOptionList(cuisineList)));
        filter.setDiet(getOptionsBySearchParam(searchParams, 'diet', createOptionList(dietList)));
        filter.setIntolerances(getOptionsBySearchParam(searchParams, 'intolerances', createOptionList(intoleranceList)));
        booleanFilters.map((value) => {
            filter.setBoolean(value, Boolean(searchParams.get(value) || false));
        });
        numberFilters.map((value) => {
            filter.setNumber(value, Number(searchParams.get(value) || 0));
        });
        stringFilters.map((value) => {
            filter.setString(value, getSearchParam(searchParams, value));
        });
        minMaxFilters.map((value: string) => {
            const minValue = Number(searchParams.get('min' + value) || 0);
            const maxValue = Number(searchParams.get('max' + value) || 0);
            filter.setMinMax(value, { min: minValue, max: maxValue });
        });
    }, [searchParams, filter]);

    const onChangeInputHandle = (value: string) => {
        filter.setSearch(value);
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
        if (filter.searchField !== '') {
            searchParams.set('query', filter.searchField);
        }
        setMultiParam('type', filter.category);
        setMultiParam('cuisine', filter.cuisine);
        setMultiParam('excludeCuisine', filter.excludeCuisine);
        setMultiParam('diet', filter.diet);
        setMultiParam('intolerances', filter.intolerances);
        setParams(searchParams);
    }

    const onChangeCategory = (value: Option[]) => { filter.setCategory(value) }
    const onChangeCuisine = (value: Option[]) => { filter.setCuisine(value) }
    const onChangeExcludedCuisine = (value: Option[]) => { filter.setExcludeCuisine(value) }
    const onChangeDiet = (value: Option[]) => { filter.setDiet(value) }
    const onChangeIntolerances = (value: Option[]) => { filter.setIntolerances(value) }

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
            <div className={styles["content-filters__other"]}>
                <MultiStringFilter 
                    filterName="cuisine"
                    className={styles["content-filters__category__block"]}
                    options={createOptionList(cuisineList)}
                    value={filter.cuisine}
                    onChange={onChangeCuisine}
                    getTitle={getTitleCuisine}
                />
                <MultiStringFilter 
                    filterName="excludeCuisine"
                    className={styles["content-filters__category__block"]}
                    options={createOptionList(cuisineList)}
                    value={filter.excludeCuisine}
                    onChange={onChangeExcludedCuisine}
                    getTitle={getTitleExcludedCuisine}
                />
                <MultiStringFilter 
                    filterName="diet"
                    className={styles["content-filters__category__block"]}
                    options={createOptionList(dietList)}
                    value={filter.diet}
                    onChange={onChangeDiet}
                    getTitle={getTitleDiet}
                />
                <MultiStringFilter 
                    filterName="intolerances"
                    className={styles["content-filters__category__block"]}
                    options={createOptionList(intoleranceList)}
                    value={filter.intolerances}
                    onChange={onChangeIntolerances}
                    getTitle={getTitleIntolerances}
                />
                {filter.booleanValues.map((value) => {
                    return (
                        <BooleanFilter
                            key={value.name}
                            filterName={value.name}
                            checked={value.value}
                            onChange={(checked) => { filter.setBoolean(value.name, checked) }}
                        />
                    )
                })}
                {filter.numberValues.map((value) => {
                    console.log(value);
                    return (
                        <NumberFilter 
                            key={value.name}
                            filterName={value.name}
                            filterSettings={{ unit: '' }}
                            value={value.value.toString()}
                            onChange={(str: string) => {
                                const newValue = Number(str);
                                if (!isNaN(newValue)) {
                                    filter.setNumber(value.name, newValue);
                                } else {
                                    filter.setNumber(value.name, 0);
                                }
                            }}
                        />
                    )
                })}
                {filter.stringValues.map((value) => {
                    return (
                        <StringFilter 
                            key={value.name}
                            filterName={value.name}
                            filterSettings={{ help: 'use , to create multiple filter' }}
                            value={value.value}
                            onChange={(str: string) => { filter.setString(value.name, str) }}
                        />
                    )
                })}
                {filter.minMaxValues.map((value) => {
                    return (
                        <MinMaxFilter 
                            key={value.name}
                            filterName={value.name}
                            filterSettings={{ unit: '' }}
                            minValue={value.value.min}
                            maxValue={value.value.max}
                            onChangeMin={(str) => {
                                const newValue = Number(str);
                                if (!isNaN(newValue)) {
                                    filter.setMinMax(value.name, { min: newValue, max: value.value.max });
                                } else {
                                    filter.setMinMax(value.name, { min: 0, max: value.value.max });
                                }
                            }}
                            onChangeMax={(str) => {
                                const newValue = Number(str);
                                if (!isNaN(newValue)) {
                                    filter.setMinMax(value.name, { min: value.value.min, max: newValue });
                                } else {
                                    filter.setMinMax(value.name, { min: value.value.min, max: 0 });
                                }
                            }}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default observer(ContentFilters);