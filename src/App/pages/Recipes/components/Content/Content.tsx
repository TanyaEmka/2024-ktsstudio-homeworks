import { observer } from "mobx-react-lite";
import * as React from "react";
import { useEffect, useCallback, useState } from "react";

import ContentFilters from "components/ContentFilters";
import { OtherType } from "components/ContentFilters/ContentFilters";
import ListShower from "components/ListShower";

import RecipeCard from "components/RecipeCard";
import { mealTypesOptions, recipesFilters } from "config/api";
import { useLocalStore } from "hooks/useLocalStore";
import RecipeListStore from "store/RecipeListStore";

import searchStore from "store/SearchParamsStore";
import ContentHeader from "./ContentHeader";

import styles from './Content.module.scss';
import custom from 'styles/customStyles.module.scss';
import classNames from "classnames";

const Content: React.FC = () => {

    const recipesStore = useLocalStore(() => new RecipeListStore());
    const [ url, setUrl ] = useState<string | undefined>();

    const getUrl = useCallback(() => {
        const newUrl = recipesStore.getUrl(
            searchStore.getOffset(),
            searchStore.getParamPair('query'),
            searchStore.getParamPair('type'),
            ...Object.keys(recipesFilters).map((key) => {
                return searchStore.getParamPair(key);
            })
        );
        setUrl(newUrl);
    }, [recipesStore, searchStore.searchParams]);

    const loadList = useCallback(() => {
        if (url) {
            recipesStore.loadingList(url);
        }
    }, [recipesStore, url]);

    useEffect(() => {
        getUrl();
        console.log(searchStore.searchParamsString, url);
    }, [searchStore.searchParams]);

    useEffect(() => {
        loadList();
    }, [url]);

    return (
        <div 
            className={classNames({
                [styles["content"]]: true,
                [custom["margin_hor"]]: true,
            })}
        >
            <ContentHeader />
            <ContentFilters 
                categoryTag="type"
                categoryOptions={mealTypesOptions}
                categoryPlaceholder="Categories"
                otherFilters={recipesFilters as OtherType}
            />
            <ListShower 
                status={recipesStore.status}
                totalCount={recipesStore.total}
            >
                {recipesStore.results.map((recipe) => {
                    return ( 
                        <RecipeCard 
                            key={recipe.id} 
                            recipe={recipe} 
                        /> 
                    )
                })}
            </ListShower>
        </div>
    )
}

export default observer(Content);