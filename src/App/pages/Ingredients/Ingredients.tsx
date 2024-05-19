import * as React from "react";
import { useEffect } from "react";
import PageTemplate from "components/PageTemplate";
import { useLocalStore } from "hooks/useLocalStore";
import Card from "components/Card";
import { observer } from "mobx-react-lite";
import IngredientListStore from "store/IngredientListStore";
import ListShower from "components/ListShower";
import ContentFilters from "components/ContentFilters";
import { intoleranceTypesOptions } from "config/api";
import searchStore from "store/SearchParamsStore";

const Ingredients: React.FC = () => {

    const ingredientStore = useLocalStore(() => new IngredientListStore());

    useEffect(() => {
        const queryStr = searchStore.getParam('query');
        if (queryStr !== '') {
            ingredientStore.loadingList(ingredientStore.getUrl(
                searchStore.getOffset(),
                searchStore.getParam('query'),
                searchStore.getParamPair('intolerances'),
            ));
        }
    }, [searchStore.searchParams, ingredientStore]);

    return (
        <PageTemplate headerName="Ingredients">
            <ContentFilters 
                inputPlaceholder="Enter ingredients"
                categoryTag="intolerances"
                categoryPlaceholder="Intolerances"
                categoryOptions={intoleranceTypesOptions}
            />
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
        </PageTemplate>
    )
}

export default observer(Ingredients);