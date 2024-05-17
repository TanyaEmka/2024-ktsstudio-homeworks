import { observer } from "mobx-react-lite";
import * as React from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import ListShower from "components/ListShower";

import { useLocalStore } from "hooks/useLocalStore";
import RecipeListStore from "store/RecipeListStore";

import { getOffset, getAllKeyValue } from "utils/searchParamsHandlers";
import ContentFilters from "../ContentFilters";
import ContentHeader from "./ContentHeader";
import RecipeCard from "components/RecipeCard";

import styles from './Content.module.scss';


const Content: React.FC = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const recipesStore = useLocalStore(() => new RecipeListStore());

    useEffect(() => {
        recipesStore.loadingList(recipesStore.getUrl(
            getOffset(searchParams),
            ...getAllKeyValue(searchParams),
        ));
    }, [searchParams, recipesStore]);

    return (
        <div className={styles["content"]}>
            <ContentHeader />
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