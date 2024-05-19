import { observer } from "mobx-react-lite";
import * as React from "react";
import { useEffect } from "react";

import ListShower from "components/ListShower";

import { useLocalStore } from "hooks/useLocalStore";
import RecipeListStore from "store/RecipeListStore";

import ContentFilters from "components/ContentFilters";
import ContentHeader from "./ContentHeader";
import RecipeCard from "components/RecipeCard";
import searchStore from "store/SearchParamsStore";

import { mealTypesOptions, recipesFilters } from "config/api";

import styles from './Content.module.scss';
import { OtherType } from "components/ContentFilters/ContentFilters";

const Content: React.FC = () => {

    const recipesStore = useLocalStore(() => new RecipeListStore());

    useEffect(() => {
        recipesStore.loadingList(recipesStore.getUrl(
            searchStore.getOffset(),
            searchStore.getParamPair('query'),
            searchStore.getParamPair('type'),
            ...Object.keys(recipesFilters).map((key) => {
                return searchStore.getParamPair(key);
            })
        ));
    }, [searchStore.searchParams, recipesStore]);

    return (
        <div className={styles["content"]}>
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