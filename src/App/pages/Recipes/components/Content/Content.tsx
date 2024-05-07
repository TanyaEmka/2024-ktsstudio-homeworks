import { observer } from "mobx-react-lite";
import * as React from "react";
import { useNavigate , useSearchParams } from "react-router-dom";

import Button from "components/Button";
import Card from "components/Card";
import ErrorBox from "components/ErrorBox";
import TimeIcon from "components/icons/TimeIcon";

import { useLocalStore } from "hooks/useLocalStore";
import { useGetRecipeList } from "query/RecipeQuery";
import RecipeListStore from "store/RecipeListStore";

import ContentFilters from "../ContentFilters";
import PageController from "../PageController";
import ContentHeader from "./ContentHeader";

import styles from './Content.module.scss';

const Content: React.FC = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const recipesStore = useLocalStore(() => new RecipeListStore());
    const navigate = useNavigate();

    const getOffset = () => {
        return ((Number(searchParams.get('page') || '1') - 1) * 9).toString();    
    }

    const getTypeString = () => {
        return searchParams
            .getAll('type').map((value) => ['type', value].join('=')).join('&') || '';       
    }

    useGetRecipeList(
        (newData) => { recipesStore.setRecipeList(newData) },
        (status) => { recipesStore.setStatus(status) },
        { 
            offset: getOffset(), 
            query: searchParams.get('query') || '', 
            types: getTypeString(),
        },
        [searchParams],
    );

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