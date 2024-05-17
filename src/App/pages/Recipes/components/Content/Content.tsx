import { observer } from "mobx-react-lite";
import * as React from "react";
import { useEffect } from "react";
import { useNavigate , useSearchParams } from "react-router-dom";

import Button from "components/Button";
import Card from "components/Card";
import TimeIcon from "components/icons/TimeIcon";
import ListShower from "components/ListShower";

import { useLocalStore } from "hooks/useLocalStore";
import RecipeListStore from "store/RecipeListStore";
import localStorage from "store/LocalStorage";

import { getOffset, getAllKeyValue } from "utils/searchParamsHandlers";
import ContentFilters from "../ContentFilters";
import ContentHeader from "./ContentHeader";

import styles from './Content.module.scss';


const Content: React.FC = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const recipesStore = useLocalStore(() => new RecipeListStore());
    const navigate = useNavigate();
    const { addSavedRecipe } = localStorage;

    useEffect(() => {
        recipesStore.loadingList(recipesStore.getUrl(
            getOffset(searchParams),
            ...getAllKeyValue(searchParams),
        ));
    }, [searchParams, recipesStore]);

    const navigateToRecipePage = (id: number) => {
        navigate('/recipe/' + id);
    }

    return (
        <div className={styles["content"]}>
            <ContentHeader />
            <ListShower 
                status={recipesStore.status}
                totalCount={recipesStore.total}
            >
                {recipesStore.results.map((recipe) => {
                    return (
                        <Card 
                            onClick={() => { navigateToRecipePage(recipe.id) }}
                            key={recipe.id}
                            image={recipe.image}
                            captionSlot={
                                <span className={styles["content__cards__card__time"]}>
                                    <TimeIcon />
                                    <span>{recipe.readyInMinutes} minutes</span>
                                </span>
                            }
                            title={recipe.title}
                            subtitle={recipe.describe}
                            contentSlot={recipe.kcal}
                            actionSlot={
                                <Button onClick={() => { addSavedRecipe(recipe) }}>
                                    Save
                                </Button>
                            }
                        />
                    )
                })}
            </ListShower>
        </div>
    )
}

export default observer(Content);