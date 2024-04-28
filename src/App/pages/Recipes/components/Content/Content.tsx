import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "components/Button";
import Card from "components/Card";
import ErrorBox from "components/ErrorBox";
import Text from "components/Text";
import TimeIcon from "components/icons/TimeIcon";
import { apiKey } from "config/api";
import { RecipeUnit, Status } from "config/apiTypes";
import customStyles from 'styles/customStyles.module.scss';
import ContentFilters from "../ContentFilters";
import PageController from "../PageController";
import styles from './Content.module.scss';
import { useLocalStore } from "hooks/useLocalStore";
import FilterStore from "store/FilterStore";

import queries from "query/RecipeQuery";
import { SuccessfulStatus } from "config/initValues";

const Content: React.FC = () => {

    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const [filterStore] = useState(new FilterStore());

    //const { data = { results: [], totalResults: 0 }, status } 
    //    = queries.useGetRecipeList((page - 1) * 9, apiKey);
    const data: any = { results: [], totalResults: 0 };
    const status: Status = SuccessfulStatus;

    const getKcal = (recipe: RecipeUnit) => {
        const recipeKcal = recipe.nutrition.nutrients
            .filter((obj) => obj.name === 'Calories')[0];

        return [Math.ceil(recipeKcal.amount), recipeKcal.unit].join(' ');
    }

    const getDescribe = (recipe: RecipeUnit) => {
        const ings = recipe.nutrition.ingredients;

        return ings.map((ing) => ing.name).join(' + ');
    }

    return (
        <div className={styles["content"]}>
            <Text className={styles["content__header"]} view='p-20' tag='div'>
                Find the perfect food and
                {' '} 
                <span className={customStyles["line"]}>drink ideas</span>
                {' '}
                for every occasion, from
                {' '}
                <span className={customStyles["line"]}>weeknight dinners</span> to
                {' '}
                <span className={customStyles["line"]}>holiday feasts</span>.
            </Text>
            <ContentFilters 
                search={filterStore.searchField} 
                setSearch={(value) => { filterStore.changeSearch(value) }} 
            />
            {status.statusName === 'ERROR' ? 
            <ErrorBox>
                {status.statusMessage}
            </ErrorBox>
            :
            <>
                <div className={styles["content__cards"]}>
                    {data.results.map((recipe: any) => {
                        return (
                            <Card 
                                onClick={() => { if (recipe) navigate('/recipe/' + recipe?.id) }}
                                key={recipe?.id}
                                image={recipe?.image}
                                captionSlot={
                                    <span className={styles["content__cards__card__time"]}>
                                        <TimeIcon />
                                        <span>{recipe?.readyInMinutes} minutes</span>
                                    </span>
                                }
                                title={recipe.title}
                                subtitle={recipe ? getDescribe(recipe): '...'}
                                contentSlot={recipe ? getKcal(recipe) : ''}
                                actionSlot={<Button>Save</Button>}
                            />
                        )
                    }) || ''}
                </div>
                <PageController 
                    pageCount={9}
                    selectedPage={page}
                    totalResults={data.totalResults}
                    onClick={(page: number) => { setPage(page) }}
                />
            </>
            }
        </div>
    )
}

export default Content;