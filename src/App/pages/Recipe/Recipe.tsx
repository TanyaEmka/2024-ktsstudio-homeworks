import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import './Recipe.scss';
import { useParams , useNavigate } from "react-router-dom";

import Text from "components/Text";
import ArrowLeftIcon from "components/icons/ArrowLeftIcon";
import EqIcon from "components/icons/EqIcon";
import IngIcon from "components/icons/IngIcon";
import { apiKey, recipe, recipeParams } from "config/api";
import { RecipeType } from "config/apiTypes";

import PreviewBlock from "./components/PreviewBlock";
import RecipeNeed from "./components/RecipeNeed";

const Recipe: React.FC = () => {

    const { id } = useParams();
    const [recipeObj, setRecipe] = useState<RecipeType | undefined>(undefined);
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
        <div className="recipe">
            <div className="recipe-header">
                <ArrowLeftIcon
                    color='accent' 
                    onClick={() => { navigate('/recipes') }} 
                />
                <Text weight='bold' view='title'>
                    {recipeObj?.title || 'Title'}
                </Text>
            </div>
            <div className="recipe-box">
                <div className="recipe-preview">
                    <img src={recipeObj?.image} alt='recipe photo' />
                    <div className="recipe-preview-info">
                        <PreviewBlock name='Preparation' unit='minutes' key='Preparation'>
                            {recipeObj?.preparationMinutes || 0}
                        </PreviewBlock>
                        <PreviewBlock name='Cooking' unit='minutes' key='Cooking'>
                            {recipeObj?.cookingMinutes || 0}
                        </PreviewBlock>
                        <PreviewBlock name='Total' unit='minutes' key='Total'>
                            {recipeObj?.readyInMinutes || 0}
                        </PreviewBlock>
                        <PreviewBlock name='Servings' unit='servings' key='Servings'>
                            {recipeObj?.servings || 0}
                        </PreviewBlock>
                        <PreviewBlock name='Rating' unit='likes' key='Rating'>
                            {recipeObj?.aggregateLikes || 0}
                        </PreviewBlock>
                    </div>
                </div>
                <div className="recipe-description">
                    <Text view='p-16'>
                        <span
                            dangerouslySetInnerHTML={{
                                __html: recipeObj?.summary || '...',
                            }}
                        ></span>
                    </Text>
                </div>
                <div className="recipe-needs">
                    <RecipeNeed 
                        name='Ingredients'
                        elements={recipeObj ? getIngredients(recipeObj) : []}
                        icon={<IngIcon />}
                    />
                    <div className="recipe-needs-line">
                        <div className="circle"></div>
                        <div className="bottom-line"></div>
                    </div>
                    <RecipeNeed 
                        name='Equipment'
                        elements={recipeObj ? getEquipment(recipeObj) : []}
                        icon={<EqIcon />}
                    />
                </div>
                <div className='recipe-directions'>
                    <Text
                        tag='div'
                        view='p-20'
                        weight='bold'
                    >
                        Directions
                    </Text>
                    <div className="recipe-directions-steps">
                        {recipeObj?.analyzedInstructions[0].steps.map((elem) => {
                            return (
                                <div key={elem.number}>
                                    <Text view='p-16' weight='bold'>
                                        Step {elem.number}
                                    </Text>
                                    <Text view='p-14'>
                                        {elem.step}
                                    </Text>
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