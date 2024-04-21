import React, { useEffect, useState } from "react";
import axios from "axios";
import './Content.scss';

import Text from "components/Text";
import Card from "components/Card";
import Button from "components/Button";
import TimeIcon from "components/icons/TimeIcon";
import ContentFilters from "../ContentFilters";

import { apiKey, recipes } from "../../../../../configs/api";

const Content: React.FC = () => {

    const [recipeList, setRecipes] = useState([]);

    useEffect(() => {
        axios.get(recipes + apiKey)
        .then((resp) => {
            setRecipes(resp.data.results);
        })
    }, [])

    const getKcal = (recipe: any) => {
        const recipeKcal = recipe.nutrition.nutrients.filter((obj: any) => obj.name === 'Calories')[0];

        return [Math.ceil(recipeKcal.amount), recipeKcal.unit].join(' ');
    }

    const getDescribe = (recipe: any) => {
        const ings: any = recipe.nutrition.ingredients;

        return ings.map((ing: any) => ing.name).join(' + ');
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
                {recipeList.map((recipe: any) => {
                    return (
                        <Card 
                            key={recipe.id}
                            image={recipe.image}
                            captionSlot={
                                <div className="content-cards-card-time">
                                    <TimeIcon />
                                    <span>{recipe.readyInMinutes} minutes</span>
                                </div>
                            }
                            title={recipe.title}
                            subtitle={getDescribe(recipe)}
                            contentSlot={getKcal(recipe)}
                            actionSlot={<Button>Save</Button>}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Content;