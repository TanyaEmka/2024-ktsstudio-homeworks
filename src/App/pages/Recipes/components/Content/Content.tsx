import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import './Content.scss';

import { useNavigate } from "react-router-dom";
import Button from "components/Button";
import Card from "components/Card";
import Text from "components/Text";
import TimeIcon from "components/icons/TimeIcon";
import ContentFilters from "../ContentFilters";
import PageController from "../PageController";

import { apiKey, recipes } from "config/api";
import { RecipeList, RecipeUnit } from "config/apiTypes";

const Content: React.FC = () => {

    const [recipeList, setRecipes] = useState<RecipeList>([]);
    const [page, setPage] = useState(1);
    const [totalResults, setTotal] = useState(612);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get([recipes, '&offset=', (page-1)*9, '&apiKey=', apiKey].join(''))
        .then((resp) => {
            setTotal(resp.data.totalResults);
            setRecipes(resp.data.results);
        })
    }, [page])

    const getKcal = (recipe: RecipeUnit) => {
        const recipeKcal = recipe.nutrition.nutrients.filter((obj) => obj.name === 'Calories')[0];

        return [Math.ceil(recipeKcal.amount), recipeKcal.unit].join(' ');
    }

    const getDescribe = (recipe: RecipeUnit) => {
        const ings = recipe.nutrition.ingredients;

        return ings.map((ing) => ing.name).join(' + ');
    }

    return (
        <div className="content">
            <Text className="content-header" view='p-20' tag='div'>
                Find the perfect food and
                {' '} 
                <span className="line">drink ideas</span>
                {' '}
                for every occasion, from
                {' '}
                <span className="line">weeknight dinners</span> to
                {' '}
                <span className="line">holiday feasts</span>.
            </Text>
            <ContentFilters />
            <div className="content-cards">
                {recipeList?.map((recipe) => {
                    return (
                        <Card 
                            onClick={() => { if (recipe) navigate('/recipe/' + recipe?.id) }}
                            key={recipe?.id}
                            image={recipe?.image}
                            captionSlot={
                                <span className="content-cards-card-time">
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
                totalResults={totalResults}
                onClick={(page: number) => { setPage(page) }}
            />
        </div>
    )
}

export default Content;