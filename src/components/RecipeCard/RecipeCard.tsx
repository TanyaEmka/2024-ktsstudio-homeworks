import * as React from "react";
import { useState, useEffect } from "react";
import Card from "components/Card";
import { CardRecipeType } from "store/LocalStorage/LocalStorage";
import { RecipeCollectionUnitType } from "types/apiTypes";
import { useNavigate } from "react-router-dom";
import Button from "components/Button";
import RecipeCardCaption from "./components/RecipeCardCaption";
import localStorage from "store/LocalStorage";
import { observer } from "mobx-react-lite";

interface RecipeCardProps {
    mode?: 'RECIPES' | 'SAVED',
    recipe: CardRecipeType | RecipeCollectionUnitType
}

const RecipeCard: React.FC<RecipeCardProps> = ({
    mode = 'RECIPES',
    recipe
}) => {

    const navigate = useNavigate();
    const { addSavedRecipe, checkRecipeInSaved, deleteRecipe, cards } = localStorage;
    const [isSaved, setIsSaved] = useState(checkRecipeInSaved(recipe.id));

    useEffect(() => {
        setIsSaved(checkRecipeInSaved(recipe.id));
    }, [cards]);

    const navigateToRecipePage = (id: number) => {
        navigate('/recipe/' + id);
    }

    const getButtonWithCallBack = (text: string, callback: () => void) => {
        return (
            <Button onClick={(e) => {
                e.stopPropagation();
                callback();
            }}>
                {text}
            </Button>
        )
    }

    const getButtonInRecipeList = (recipe: CardRecipeType | RecipeCollectionUnitType) => {
        if (!isSaved) {
            return getButtonWithCallBack('Save', () => {
                addSavedRecipe(recipe as RecipeCollectionUnitType);
            });
        }

        return getButtonWithCallBack('In saves', () => {
            navigate('/saved');
        })
    }

    const getActionSlotByMode = (recipe: CardRecipeType | RecipeCollectionUnitType) => {
        switch(mode) {
            case 'RECIPES':
                return getButtonInRecipeList(recipe);
            case 'SAVED':
                return getButtonWithCallBack('Delete', () => {
                    deleteRecipe(recipe.id);
                })
        }
    }

    return (
        <Card
            image={recipe.image}
            title={recipe.title}
            subtitle={recipe.describe}
            contentSlot={recipe.kcal}
            onClick={() => { navigateToRecipePage(recipe.id) }}
            captionSlot={
                <RecipeCardCaption 
                    readyInMinutes={recipe.readyInMinutes} 
                />
            }
            actionSlot={getActionSlotByMode(recipe)}
        />
    )
}

export default observer(RecipeCard);