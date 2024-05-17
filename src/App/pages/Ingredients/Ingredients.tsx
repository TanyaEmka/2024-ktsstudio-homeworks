import * as React from "react";
import { useEffect } from "react";
import PageTemplate from "components/PageTemplate";
import IngredientListStore from "store/IngredientsStore/IngredientListStore";
import { useLocalStore } from "hooks/useLocalStore";
import Card from "components/Card";
import { useSearchParams } from "react-router-dom";
import { getOffset, getAllKeyValue } from "utils/searchParamsHandlers";
import ErrorBox from "components/ErrorBox";
import Text from "components/Text";
import { observer } from "mobx-react-lite";

const Ingredients: React.FC = () => {

    const ingredientStore = useLocalStore(() => new IngredientListStore());
    const [ searchParams, setSearchParams ] = useSearchParams();

    useEffect(() => {
        console.log(ingredientStore.status);
        ingredientStore.loadingIngredientList(
            getOffset(searchParams), 'a',
            ...getAllKeyValue(searchParams),
        )
    }, [searchParams, ingredientStore]);

    return (
        <PageTemplate headerName="Ingredients">
            <div className="ingredients">
                {ingredientStore.status.statusName === 'ERROR' ?
                <ErrorBox>
                    {ingredientStore.status.statusMessage}
                </ErrorBox>
                : ingredientStore.status.statusName === 'LOADING' ?
                <Text>Loading...</Text>
                :
                <>
                    <div className="ingredients-cards">
                        {ingredientStore.results.map((ingredient) => {
                            return (
                                <Card 
                                    key={ingredient.id}
                                    image={'https://img.spoonacular.com/ingredients_500x500/' + ingredient.image}
                                    title={ingredient.name}
                                    subtitle={''}
                                />
                            )
                        })}
                    </div>
                </>
                }
            </div>
        </PageTemplate>
    )
}

export default observer(Ingredients);