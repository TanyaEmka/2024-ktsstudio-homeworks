import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import './Recipe.scss';
import { useParams , useNavigate } from "react-router-dom";

import Text from "components/Text";
import ArrowLeftIcon from "components/icons/ArrowLeftIcon";
import EqIcon from "components/icons/EqIcon";
import IngIcon from "components/icons/IngIcon";
import { apiKey, recipe, recipeParams } from "../../../configs/api";

type RecipeType = {
    id: number,
    title: string,
    image: string,
    preparationMinutes: number,
    cookingMinutes: number,
    readyInMinutes: number,
    servings: number,    
    summary: string,
    aggregateLikes: number,
    extendedIngredients: Array<{ id: number, amount: number, name: string, unit: string }>,
    analyzedInstructions: [{ 
        steps: Array<{ number: number, step: string, equipment: Array<{ name: string }> }> 
    }]
}

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

    return (
        <div className="recipe">
            <div className="recipe-header">
                <ArrowLeftIcon
                    color='accent' 
                    onClick={() => { navigate('/recipes') }} 
                />
                <Text
                    weight='bold'
                    view='title'
                >
                    {recipeObj?.title || 'Title'}
                </Text>
            </div>
            <div className="recipe-box">
                <div className="recipe-preview">
                    <img src={recipeObj?.image} alt='recipe photo' />
                    <div className="recipe-preview-info">
                        <div className="recipe-preview-info-block">
                            <Text view='p-16'>Preparation</Text>
                            <Text weight='bold' color='accent' view='p-16'>{recipeObj?.preparationMinutes || '0'} minutes</Text>
                        </div>
                        <div className="recipe-preview-info-block">
                            <Text view='p-16'>Cooking</Text>
                            <Text weight='bold' color='accent' view='p-16'>{recipeObj?.cookingMinutes || '0'} minutes</Text>
                        </div>
                        <div className="recipe-preview-info-block">
                            <Text view='p-16'>Total</Text>
                            <Text weight='bold' color='accent' view='p-16'>{recipeObj?.readyInMinutes || '0'} minutes</Text>
                        </div>
                        <div className="recipe-preview-info-block">
                            <Text view='p-16'>Servings</Text>
                            <Text weight='bold' color='accent' view='p-16'>{recipeObj?.servings || '0'} servings</Text>
                        </div>
                        <div className="recipe-preview-info-block">
                            <Text view='p-16'>Ratings</Text>
                            <Text weight='bold' color='accent' view='p-16'>{recipeObj?.aggregateLikes || '0'} likes</Text>
                        </div>
                    </div>
                </div>
                <div className="recipe-description">
                    <Text 
                        view='p-16'
                    >
                        <span
                            dangerouslySetInnerHTML={{
                                __html: recipeObj?.summary || '...',
                            }}
                        ></span>
                    </Text>
                </div>
                <div className="recipe-needs">
                    <div className="recipe-needs-block">
                        <Text
                            view='p-20'
                            weight='bold'
                        >
                            Ingredients
                        </Text>
                        <div className="recipe-needs-block-elems">
                            {recipeObj?.extendedIngredients.map((elem) => {
                                return (
                                    <div key={elem.id}>
                                        <IngIcon />
                                        <Text
                                            view='p-16'
                                        >
                                            {elem.amount} {elem.unit} {elem.name}
                                        </Text>
                                    </div>
                                )
                            }) || ''}
                        </div>
                    </div>
                    <div className="recipe-needs-line">
                        <div className="circle">
                        </div>
                        <div className="bottom-line">
                        </div>
                    </div>    
                    <div className="recipe-needs-block">
                        <Text
                            view='p-20'
                            weight='bold'
                        >
                            Equipment
                        </Text>
                        <div className="recipe-needs-block-elems">
                            {recipeObj ? getEquipment(recipeObj).map((elem) => {
                                return (
                                    <div key={elem}>
                                        <EqIcon />
                                        <Text
                                            view='p-16'
                                        >
                                            {elem}
                                        </Text>
                                    </div>
                                )
                            }) : ' '}
                        </div>
                    </div>
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
                                    <Text
                                        view='p-14'
                                    >
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