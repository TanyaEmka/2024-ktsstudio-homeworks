import { observer } from "mobx-react-lite";
import * as React from "react";
import { useEffect, useCallback, useRef, useState } from "react";
import Button from "components/Button";
import Input from "components/Input";
import Text from "components/Text";
import MultiDropdown, { Option } from "components/MultiDropdown";
import SearchIcon from "components/icons/SearchIcon";
import { useLocalStore } from "hooks/useLocalStore";
import FilterStore from "store/FilterStore";
import styles from './ContentFilters.module.scss';
import searchStore from "store/SearchParamsStore";
import { FilterItemTypes } from "store/FilterStore/FilterStore";
import MultiStringFilter from "components/filters/MultiStringFilter";
import StringFilter from "components/filters/StringFilter";
import NumberFilter from "components/filters/NumberFilter";
import BooleanFilter from "components/filters/BooleanFilter";
import CloseIcon from "components/icons/CloseIcon";
import { useSearchParams } from "react-router-dom";

interface ConfigType {
    type: FilterItemTypes
}

interface ConfigSingleType extends ConfigType {
    type: 'STRING' | 'BOOLEAN' | 'NUMBER',
    placeholder: string,
}

interface ConfigMinMaxType extends ConfigType {
    type: 'MINMAX',
    minMaxValues: Option[],
}

interface ConfigOptionType extends ConfigType {
    type: 'OPTION',
    placeholder: string,
    options: Option[],
    selectMode?: 'ONE' | 'MULTI',
}

export type OtherType = {
    [key: string]: ConfigSingleType | ConfigOptionType | ConfigMinMaxType
}

interface ContentFiltersProps {
    inputPlaceholder?: string,
    emptyError?: boolean,
    categoryTag?: string,
    categoryOptions?: Option[],
    categoryPlaceholder?: string,
    otherFilters?: OtherType,
}

const ContentFilters: React.FC<ContentFiltersProps> = (props) => {

    const filter = useLocalStore(() => new FilterStore());
    const [ searchParams, setSearchParam ] = useSearchParams();
    const [ inputError, setInputError ] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    const handleOutsideOtherFiltersClick = (e: MouseEvent | TouchEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
            filter.setVisibility(false);
        }
    }

    const getFiltersForStore = useCallback(() => {
        if (props.otherFilters) {
            let filterObj = {};
            Object.entries(props.otherFilters).forEach(([key, value]) => {
                Object.assign(filterObj, {
                    [key]: value.type,
                })
            });
            return filterObj;
        }
        return {};
    }, [props.otherFilters]);

    const generateOtherFilters = (): [string, string][] => {
        if (props.otherFilters) {
            return Object.entries(props.otherFilters).map(([key, filt]) => {
                if (filt.type === 'OPTION') {
                    const values = filter.getOptionItemValue(key);
                    const valueStr = encodeURIComponent(values.map((opt) => opt.value).join(','));
                    return [key, valueStr] as [string, string];
                }
                if (filt.type !== 'MINMAX') {
                    const value = filter.getSingleItemValue(key);
                    return [key, value];
                }
                return ['', ''];
            })
        }
        return [];
    } 

    const getNotEmptyOtherFilters = useCallback(() => {
        let result: string[] = [];
        if (props.otherFilters) {
            Object.entries(props.otherFilters).map(([key, value]) => {
                if (value.type === 'OPTION') {
                    const optionValue = filter.getOptionItemValue(key);
                    if (optionValue.length !== 0) {
                        result.push([key, optionValue.map((opt) => opt.value).join(', ')].join(': '));
                    }
                } else if (value.type !== 'MINMAX') {
                    const stringValue = filter.getSingleItemValue(key);
                    if (stringValue !== '') {
                        result.push([key, stringValue].join(': '));
                    }
                }   
            });
        }

        return result;
    }, [props.otherFilters, filter]);

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideOtherFiltersClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideOtherFiltersClick);
        }
    }, []);

    useEffect(() => {
        if (props.otherFilters) {
            filter.configFilters(getFiltersForStore());
        }
    }, [props.otherFilters, filter]);

    useEffect(() => {
        if (searchStore.searchParamsString !== searchParams.toString()) {
            searchStore.getSearchParams(searchParams);
            const queryParam = searchStore.getParam('query');
            if (filter.searchField !== queryParam) {
                filter.setSearch(searchStore.getParam('query'));
            } 
            if (props.categoryTag && props.categoryOptions) {
                const categoryParam = searchStore.getMultipleParam(
                    props.categoryTag, 
                    props.categoryOptions
                );
                if (
                    categoryParam.map((cat) => cat.value).join(',') !==
                    filter.category.map((cat) => cat.value).join(',')
                ) {
                    filter.setCategory(categoryParam);
                }
            }
            if (props.otherFilters) {
                Object.entries(props.otherFilters).map(([key, value]) => {
                    if (value.type === 'OPTION') {
                        const optionParam = searchStore.getMultipleParam(
                            key, value.options
                        );
                        if (
                            optionParam.map((cat) => cat.value).join(',') !==
                            filter.getOptionItemValue(key).map((cat) => cat.value).join(',')
                        ) {
                            filter.setOptionItemValue(key, optionParam);
                        }
                    } else if (value.type !== 'MINMAX') {
                        const stringValue = searchStore.getParam(key);
                        if (filter.getSingleItemValue(key) !== stringValue) {
                            filter.setSingleItemValue(key, searchStore.getParam(key));
                        }
                    }
                });
            }
        }
    }, [
        searchParams,
        props.categoryOptions,
        props.categoryTag,
        props.otherFilters
    ]);

    const changeSearchField = () => {
        searchStore.deleteSearchParam('page');
        searchStore.setSearchParam('query', filter.searchField);
        setSearchParam(searchStore.searchParamURL);
    }

    const onChangeInputHandle = (value: string) => {
        if (inputError) {
            setInputError(false);
        }
        filter.setSearch(value);
    }

    const onChangeCategory = (value: Option[]) => { 
        filter.setCategory(value);
        searchStore.deleteSearchParam('page');
        if (props.categoryTag) {
            searchStore.setMultiParam(props.categoryTag, value.map((val) => val.value));
        }
        setSearchParam(searchStore.searchParamURL);
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

    const applyMoreFilters = () => {
        filter.setVisibility(false);
        searchStore.deleteSearchParam('page');
        searchStore.changeParamArray(...generateOtherFilters());
        setSearchParam(searchStore.searchParamURL);
    }

    return (
        <div className={styles["content-filters"]}>
            <div className={styles["content-filters__search"]}>
                <Input
                    valueError={inputError}
                    className={styles["content-filters__search__input"]}
                    value={filter.searchField}
                    onChange={onChangeInputHandle}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            if (props.emptyError && filter.searchField === '') {
                                setInputError(true);
                            } else {
                                changeSearchField();
                            }
                        }
                    }}
                    placeholder={props.inputPlaceholder || 'Enter dishes'}
                    afterSlot={
                        <CloseIcon
                            color='secondary'
                            width={30}
                            height={30}
                            onClick={() => { filter.setSearch('') }}
                        />
                    }
                />
                <Button onClick={() => {
                    if (props.emptyError && filter.searchField === '') {
                        setInputError(true)
                    } else {
                        changeSearchField();
                    }
                }}>
                    <SearchIcon width='25' height='24' />
                </Button>
            </div>
            <div className={styles["content-filters__category"]}>
                {props.otherFilters ?
                <Text 
                    color="accent" 
                    view='p-16'
                    tag='div'
                    className={styles["content-filters__category__shower"]}
                    onCLick={showMoreFilters}
                >
                    <u>Show more filters</u>
                </Text>
                : <span></span>
                }
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
            <div className={styles["content-filters__tags"]}>
                {getNotEmptyOtherFilters().map((tag) => {
                    return (
                        <Text
                            key={tag}
                            className={styles["content-filters__tags__tag"]}
                            tag='div' view='p-14'
                        >
                            {tag}
                        </Text>
                    )
                })}
            </div>
            {props.otherFilters && filter.visibility && !filter.isEmpty &&
            <div 
                ref={ref}
                className={styles["content-filters__other"]}
            >
                <div
                    className={styles["content-filters__other__header"]}
                >
                    <Text tag='div' view='p-20'>
                        Other Filters
                    </Text>
                    <CloseIcon
                        color='accent'
                        width={40}
                        height={40}
                        onClick={() => { filter.setVisibility(false) }}
                        className={styles["content-filters__other__header__close"]}
                    />
                </div>
                <div
                    className={styles["content-filters__other__multi"]}
                >
                    {Object.entries(props.otherFilters).filter(([_, val]) => val.type === 'OPTION').map(([key, value]) => {

                        if (value.type === 'OPTION') {
                        return (
                            <MultiStringFilter
                                key={key}
                                filterName={key}
                                options={value.options}
                                value={filter.getOptionItemValue(key)}
                                onChange={(newVal: Option[]) => { 
                                    filter.setOptionItemValue(key, newVal);
                                }}
                                getTitle={(newVal: Option[]) => {
                                    return getTitleWithInit(newVal, value.placeholder);
                                }}
                                selectMode={value.selectMode}
                            />   
                        )
                        }
                    })
                    }
                </div>
                <div
                    className={styles["content-filters__other__string"]}
                >
                    {Object.entries(props.otherFilters)
                        .filter(([_, val]) => val.type === 'STRING').map(([key, value]) => {

                        if (value.type === 'STRING') {
                            return (
                                <StringFilter 
                                    key={key}
                                    filterName={key}
                                    filterSettings={{ help: '' }}
                                    placeholder={value.placeholder}
                                    value={filter.getSingleItemValue(key)}
                                    onChange={(value) => { filter.setSingleItemValue(key, value) }}
                                />
                            )
                        }
                    })
                    }
                </div>
                <div
                    className={styles["content-filters__other__number"]}
                >
                    {Object.entries(props.otherFilters)
                        .filter(([_, val]) => val.type === 'NUMBER').map(([key, value]) => {

                        if (value.type === 'NUMBER') {
                            return (
                                <NumberFilter
                                    key={key}
                                    filterName={key}
                                    filterSettings={{ unit: '' }}
                                    placeholder={value.placeholder}
                                    value={filter.getSingleItemValue(key)}
                                    onChange={(value) => { filter.setSingleItemValue(key, value) }}
                                />
                            )
                        }
                    })
                    }
                </div>
                <div
                    className={styles["content-filters__other__boolean"]}
                >
                    {Object.entries(props.otherFilters)
                        .filter(([_, val]) => val.type === 'BOOLEAN').map(([key, value]) => {

                        if (value.type === 'BOOLEAN') {
                            return (
                                <BooleanFilter
                                    key={key}
                                    filterName={key}
                                    checked={filter.getSingleItemValue(key) === 'true'} 
                                    onChange={(checked) => { 
                                        filter.setSingleItemValue(key, (checked).toString());
                                    }}
                                />
                            )
                        }
                    })
                    }
                </div>
                <div className={styles["content-filters__other__hide"]}>
                    <Button onClick={() => {
                        filter.clearOtherFilters();
                    }}>
                        Clear all
                    </Button>
                    <Button onClick={() => {
                        applyMoreFilters();
                    }}>
                        Apply
                    </Button>
                </div>
            </div>
            }
        </div>
    )
}

export default observer(ContentFilters);