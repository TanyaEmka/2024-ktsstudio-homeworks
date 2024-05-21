import { observer } from "mobx-react-lite";
import * as React from "react";
import { useEffect } from "react";
import { useParams , useNavigate } from "react-router-dom";

import Button from "components/Button";
import ErrorBox from "components/ErrorBox";
import Text from "components/Text";
import ArrowLeftIcon from "components/icons/ArrowLeftIcon";
import EqIcon from "components/icons/EqIcon";
import IngIcon from "components/icons/IngIcon";


import { useLocalStore } from "hooks/useLocalStore";
import RecipeStore from "store/RecipeStore";
import { RecipeType } from "types/apiTypes";
import PreviewBlock from "./components/PreviewBlock";
import RecipeNeed from "./components/RecipeNeed";
import styles from './Recipe.module.scss';
import custom from 'styles/customStyles.module.scss';
import classNames from "classnames";

const Recipe: React.FC = () => {

    const { id } = useParams();
    const { 
        recipe: recipeObj, 
        status, 
        loadingRecipe 
    } = useLocalStore(() => new RecipeStore());
    const navigate = useNavigate();

    useEffect(() => {
        loadingRecipe(Number(id));
    }, [id, loadingRecipe]);

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
        <div 
            className={classNames({
                [styles["recipe"]]: true,
                [custom["margin_hor"]]: true,
            })}
        >
            <div className={styles["recipe__header"]}>
                <ArrowLeftIcon
                    color='accent'
                    onClick={() => { navigate('/recipes') }} 
                />
                <Text weight='bold' view='title'>
                    {recipeObj.title}
                </Text>
            </div>
            {status.statusName === 'ERROR' ?
            <ErrorBox
                errorSlot={<Button onClick={() => navigate('/recipes')}>Go to main page</Button>}
            >
                {status.statusMessage}
            </ErrorBox>
            :
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
                        })}
                    </div>
                </div>    
            </div>
            }
        </div>
    )
}

export default observer(Recipe);