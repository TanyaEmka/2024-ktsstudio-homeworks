import * as React from "react";
import { useEffect } from "react";
import PageTemplate from "components/PageTemplate";
import { useLocalStore } from "hooks/useLocalStore";
import Card from "components/Card";
import { useSearchParams } from "react-router-dom";
import { getOffset, getAllKeyValue } from "utils/searchParamsHandlers";
import { observer } from "mobx-react-lite";
import IngredientListStore from "store/IngredientListStore";
import ListShower from "components/ListShower";

const Ingredients: React.FC = () => {

    const ingredientStore = useLocalStore(() => new IngredientListStore());
    const [ searchParams, setSearchParams ] = useSearchParams();

    useEffect(() => {
        ingredientStore.loadingList(ingredientStore.getUrl(
            getOffset(searchParams), 'a',
            ...getAllKeyValue(searchParams),
        ));
    }, [searchParams, ingredientStore]);

    return (
        <PageTemplate headerName="Ingredients">
            <div className="ingredients">
                <ListShower 
                    status={ingredientStore.status}
                    totalCount={ingredientStore.total}
                >
                    {ingredientStore.results.map((ingredient) => {
                        return (
                            <Card 
                                key={ingredient.id}
                                image={ingredientStore.getImageUrl(ingredient.image)}
                                title={ingredient.name}
                                subtitle={''}
                            />
                        )
                    })}
                </ListShower>
            </div>
        </PageTemplate>
    )
}

export default observer(Ingredients);