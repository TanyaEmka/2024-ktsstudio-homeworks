import { observer } from "mobx-react-lite";
import * as React from "react";
import { useEffect } from "react";
import { useNavigate , useSearchParams } from "react-router-dom";

import Button from "components/Button";
import Card from "components/Card";
import ErrorBox from "components/ErrorBox";
import Text from "components/Text";
import TimeIcon from "components/icons/TimeIcon";

import { useLocalStore } from "hooks/useLocalStore";
import RecipeListStore from "store/RecipeListStore";

import { getParamsString, getOffset, getSearchParam } from "utils/searchParamsHandlers";
import ContentFilters from "../ContentFilters";
import PageController from "../PageController";
import ContentHeader from "./ContentHeader";

import styles from './Content.module.scss';


const Content: React.FC = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const recipesStore = useLocalStore(() => new RecipeListStore());
    const navigate = useNavigate();

    useEffect(() => {
        recipesStore.loadingRecipeList(
            getOffset(searchParams),
            getSearchParam(searchParams, 'query'),
            getParamsString(searchParams, 'type'),
        )
    }, [searchParams, recipesStore]);

    const pageControllerClick = (page: number) => {
        searchParams.set('page', page.toString());
        setSearchParams(searchParams);
    }

    const navigateToRecipePage = (id: number) => {
        navigate('/recipe/' + id);
    }

    return (
        <div className={styles["content"]}>
            <ContentHeader />
            <ContentFilters />
            {recipesStore.status.statusName === 'ERROR' ? 
            <ErrorBox>
                {recipesStore.status.statusMessage}
            </ErrorBox>
            :
            recipesStore.status.statusName === 'LOADING' ?
            <Text>Loading...</Text>
            :
            <>
                <div className={styles["content__cards"]}>
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
                                actionSlot={<Button>Save</Button>}
                            />
                        )
                    })}
                </div>
                {recipesStore.results.length > 0 &&
                <PageController 
                    selectedPage={Number(getSearchParam(searchParams, 'page', '1'))}
                    totalResults={recipesStore.totalResults}
                    onClick={pageControllerClick}
                />
                }
            </>
            }
        </div>
    )
}

export default observer(Content);