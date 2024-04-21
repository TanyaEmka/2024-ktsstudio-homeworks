import React, { useEffect, useState } from "react";
import './Recipe.scss';

import axios from "axios";
import { useParams } from "react-router-dom";

import Text from "components/Text";
import ArrowLeftIcon from "components/icons/ArrowLeftIcon";
import IngIcon from "components/icons/IngIcon";
import EqIcon from "components/icons/EqIcon";
import { useNavigate } from "react-router-dom";
import { apiKey, recipe, recipeParams } from "../../../configs/api";

const Recipe: React.FC = () => {

    const { id } = useParams();
    const [recipeObj, setRecipe] = useState<any>(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        /*axios.get(recipe + id + recipeParams + apiKey)
        .then((resp) => {
            setRecipe(resp.data);
        })*/
    }, []);

    return (
        <div className="recipe">
            <div className="recipe-header">
                <ArrowLeftIcon color='accent' onClick={() => { navigate('/recipes') }} />
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
                    <Text view='p-16'>
                        {recipeObj?.summary || '...'}
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
                            {['xxx', 'xxx', 'xxx', 'xxx', 'xxx', 'xxx','xxx', 'xxx', 'xxx','xxx', 'xxx', 'xxx'].map((elem, index) => {
                                return (
                                    <div key={index}>
                                        <IngIcon />
                                        <Text
                                            view='p-16'
                                        >
                                            {elem}
                                        </Text>
                                    </div>
                                )
                            })}
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
                            {['xxx', 'xxx', 'xxx', 'xxx', 'xxx', 'xxx'].map((elem, index) => {
                                return (
                                    <div key={index}>
                                        <EqIcon />
                                        <Text
                                            view='p-16'
                                        >
                                            {elem}
                                        </Text>
                                    </div>
                                )
                            })}
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
                        {['xxx', 'xxx', 'xxx', 'xxx', 'xxx', 'xxx'].map((elem, index) => {
                            return (
                                <div>
                                    <Text view='p-16' weight='bold'>
                                        Step {index + 1}
                                    </Text>
                                    <Text
                                        view='p-14'
                                    >
                                        {elem}
                                    </Text>
                                </div>
                            )
                        })}
                    </div>
                </div>    
            </div>
        </div>
    )
}

export default Recipe;