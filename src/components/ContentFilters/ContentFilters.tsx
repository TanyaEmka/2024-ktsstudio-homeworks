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
import { FilterItemTypes } from "store/FilterStore/FilterStore";
import MultiStringFilter from "components/filters/MultiStringFilter";
import StringFilter from "components/filters/StringFilter";
import NumberFilter from "components/filters/NumberFilter";
import BooleanFilter from "components/filters/BooleanFilter";

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
    categoryTag?: string,
    categoryOptions?: Option[],
    categoryPlaceholder?: string,
    otherFilters?: OtherType,
}

const ContentFilters: React.FC<ContentFiltersProps> = (props) => {

    const filter = useLocalStore(() => new FilterStore());

    const getFiltersForStore = () => {
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
    }

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

    useEffect(() => {
        searchStore.getSearchParams();
        if (props.otherFilters) {
            filter.configFilters(getFiltersForStore());
        }
    }, []);

    useEffect(() => {
        filter.setSearch(searchStore.getParam('query'));
        if (props.categoryTag && props.categoryOptions) {
            filter.setCategory(searchStore.getMultipleParam(
                props.categoryTag, 
                props.categoryOptions
            ));
        }
        if (props.otherFilters) {
            Object.entries(props.otherFilters).map(([key, value]) => {
                if (value.type === 'OPTION') {
                    filter.setOptionItemValue(key, searchStore.getMultipleParam(
                        key, value.options
                    ));
                } else if (value.type !== 'MINMAX') {
                    filter.setSingleItemValue(key, searchStore.getParam(key));
                }
            });
        }
    }, [searchStore.searchParams, filter]);

    const changeSearchParams = () => {
        searchStore.changeSearchParamsForFilters(
            filter.searchField,
            props.categoryTag, filter.category,
            generateOtherFilters()
        )
    }

    const onChangeInputHandle = (value: string) => {
        filter.setSearch(value);
    }

    const onChangeCategory = (value: Option[]) => { 
        filter.setCategory(value);
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

    const hideMoreFilters = () => {
        filter.setVisibility(false);
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
            {props.otherFilters && filter.visibility && !filter.isEmpty &&
            <div className={styles["content-filters__other"]}>
                <Text
                    tag='div'
                    view='p-20'
                    className={styles["content-filters__other__header"]}
                >
                    Other Filters
                </Text>
                <div
                    className={styles["content-filters__other__multi"]}
                >
                    {Object.entries(props.otherFilters).filter(([key, val]) => val.type === 'OPTION').map(([key, value]) => {

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
                        .filter(([key, val]) => val.type === 'STRING').map(([key, value]) => {

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
                        .filter(([key, val]) => val.type === 'NUMBER').map(([key, value]) => {

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
                        .filter(([key, val]) => val.type === 'BOOLEAN').map(([key, value]) => {

                        if (value.type === 'BOOLEAN') {
                            return (
                                <BooleanFilter
                                    key={key}
                                    filterName={key}
                                    checked={filter.getSingleItemValue(key) === 'true'} 
                                    onChange={(checked) => { 
                                        console.log(filter.getSingleItemValue(key));
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
                        hideMoreFilters();
                    }}>
                        hide filters
                    </Button>
                </div>
            </div>
            }
        </div>
    )
}

export default observer(ContentFilters);