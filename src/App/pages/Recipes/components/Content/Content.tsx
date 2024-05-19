import { observer } from "mobx-react-lite";
import * as React from "react";
import { useEffect } from "react";

import ListShower from "components/ListShower";

import { useLocalStore } from "hooks/useLocalStore";
import RecipeListStore from "store/RecipeListStore";

import ContentFilters from "../ContentFilters";
import ContentHeader from "./ContentHeader";
import RecipeCard from "components/RecipeCard";
import searchParamsStore from "store/SearchParamsStore";

import styles from './Content.module.scss';


const Content: React.FC = () => {
    const recipesStore = useLocalStore(() => new RecipeListStore());

    useEffect(() => {
        recipesStore.loadingList(recipesStore.getUrl(
            searchParamsStore.getOffset(),
            searchParamsStore.getParamPair('query'),
        ));
    }, [searchParamsStore.searchParams, recipesStore]);

    return (
        <div className={styles["content"]}>
            <ContentHeader />
            <ContentFilters />
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