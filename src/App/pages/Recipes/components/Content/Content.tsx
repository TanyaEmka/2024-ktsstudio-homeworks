import { observer } from "mobx-react-lite";
import * as React from "react";
import { useEffect } from "react";
import { useNavigate , useSearchParams } from "react-router-dom";

import Button from "components/Button";
import Card from "components/Card";
import ErrorBox from "components/ErrorBox";
import TimeIcon from "components/icons/TimeIcon";

import { useLocalStore } from "hooks/useLocalStore";
import RecipeListStore from "store/RecipeListStore";

import ContentFilters from "../ContentFilters";
import PageController from "../PageController";
import ContentHeader from "./ContentHeader";

import styles from './Content.module.scss';

import { getParamsString, getOffset, getSearchParam } from "utils/searchParamsHandlers";

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
    }, [searchParams]);

    return (
        <div className={styles["content"]}>
            <ContentHeader />
            <ContentFilters />
            {recipesStore.status.statusName === 'ERROR' ? 
            <ErrorBox>
                {recipesStore.status.statusMessage}
            </ErrorBox>
            :
            <>
                <div className={styles["content__cards"]}>
                    {recipesStore.results.map((recipe) => {
                        return (
                            <Card 
                                onClick={() => { navigate('/recipe/' + recipe.id) }}
                                key={recipe.id}
                                image={recipe.image}
                                captionSlot={
                                    <span className={styles["content__cards__card__time"]}>
                                        <TimeIcon />
                                        <span>{recipe.readyInMinutes} minutes</span>
                                    </span>
                                }
                                title={recipe.title}
                                subtitle={recipesStore.getDescribe(recipe.nutrition.ingredients)}
                                contentSlot={recipesStore.getKcal(recipe)}
                                actionSlot={<Button>Save</Button>}
                            />
                        )
                    })}
                </div>
                <PageController 
                    pageCount={9}
                    selectedPage={Number(searchParams.get('page') || '1')}
                    totalResults={recipesStore.totalResults}
                    onClick={(page: number) => { 
                        searchParams.set('page', page.toString());
                        setSearchParams(searchParams);
                    }}
                />
            </>
            }
        </div>
    )
}

export default observer(Content);