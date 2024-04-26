import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { useParams , useNavigate } from "react-router-dom";

import Text from "components/Text";
import ArrowLeftIcon from "components/icons/ArrowLeftIcon";
import EqIcon from "components/icons/EqIcon";
import IngIcon from "components/icons/IngIcon";
import { apiKey, recipe, recipeParams } from "config/api";
import { RecipeType } from "config/apiTypes";

import { RecipeInit } from "config/initValues";
import PreviewBlock from "./components/PreviewBlock";
import RecipeNeed from "./components/RecipeNeed";
import styles from './Recipe.module.scss';

const Recipe: React.FC = () => {

    const { id } = useParams();
    const [recipeObj, setRecipe] = useState<RecipeType>(RecipeInit);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(recipe + id + recipeParams + apiKey)
        .then((resp) => {
            setRecipe(resp.data);
        })
    }, [id]);

    const getEquipment = (recipeObj: RecipeType) => {
        const uniqEq = new Set<string>();
        recipeObj.analyzedInstructions[0].steps.forEach((step) => {
            step.equipment.forEach((eq) => {
                uniqEq.add(eq.name);
            })
        });

        return Array.from<string>(uniqEq);
    }

    const getIngredients = (recipeObj: RecipeType) => {
        return recipeObj.extendedIngredients
            .map(({ amount, unit, name}) => [amount, unit, name].join(' '));
    }

    return (
        <div className={styles["recipe"]}>
            <div className={styles["recipe__header"]}>
                <ArrowLeftIcon
                    color='accent'
                    onClick={() => { navigate('/recipes') }} 
                />
                <Text weight='bold' view='title'>
                    {recipeObj.title}
                </Text>
            </div>
            <div className={styles["recipe__box"]}>
                <div className={styles["recipe__box__preview"]}>
                    <img src={recipeObj.image} alt='recipe photo' />
                    <div className={styles["recipe__box__preview__info"]}>
                        <PreviewBlock name='Preparation' unit='minutes' key='Preparation'>
                            {recipeObj.preparationMinutes}
                        </PreviewBlock>
                        <PreviewBlock name='Cooking' unit='minutes' key='Cooking'>
                            {recipeObj.cookingMinutes}
                        </PreviewBlock>
                        <PreviewBlock name='Total' unit='minutes' key='Total'>
                            {recipeObj.readyInMinutes}
                        </PreviewBlock>
                        <PreviewBlock name='Servings' unit='servings' key='Servings'>
                            {recipeObj.servings}
                        </PreviewBlock>
                        <PreviewBlock name='Rating' unit='likes' key='Rating'>
                            {recipeObj.aggregateLikes}
                        </PreviewBlock>
                    </div>
                </div>
                <div className={styles["recipe__box__description"]}>
                    <Text view='p-16'>
                        <span
                            dangerouslySetInnerHTML={{
                                __html: recipeObj.summary,
                            }}
                        ></span>
                    </Text>
                </div>
                <div className={styles["recipe__box__needs"]}>
                    <RecipeNeed
                        name='Ingredients'
                        elements={getIngredients(recipeObj)}
                        icon={<IngIcon />}
                    />
                    <div className={styles["recipe__box__needs__line"]}>
                        <div className={styles["circle"]}></div>
                        <div className={styles["bottom-line"]}></div>
                    </div>
                    <RecipeNeed 
                        name='Equipment'
                        elements={getEquipment(recipeObj)}
                        icon={<EqIcon />}
                    />
                </div>
                <div className={styles['recipe__box__directions']}>
                    <Text
                        tag='div'
                        view='p-20'
                        weight='bold'
                    >
                        Directions
                    </Text>
                    <div className={styles["recipe__box__directions__steps"]}>
                        {recipeObj.analyzedInstructions[0].steps.map((elem) => {
                            return (
                                <div key={elem.number}>
                                    <Text view='p-16' weight='bold'>
                                        Step {elem.number}
                                    </Text>
                                    <Text view='p-14'>{elem.step}</Text>
                                </div>
                            )
                        }) || ''}
                    </div>
                </div>    
            </div>
        </div>
    )
}

export default Recipe;