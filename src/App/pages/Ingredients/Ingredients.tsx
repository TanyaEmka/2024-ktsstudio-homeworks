import { observer } from "mobx-react-lite";
import * as React from "react";
import { useEffect } from "react";
import Card from "components/Card";
import ContentFilters from "components/ContentFilters";
import { OtherType } from "components/ContentFilters/ContentFilters";
import ListShower from "components/ListShower";
import PageTemplate from "components/PageTemplate";
import { intoleranceTypesOptions , ingredientFilters } from "config/api";
import { useLocalStore } from "hooks/useLocalStore";
import IngredientListStore from "store/IngredientListStore";
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
                emptyError={true}
                categoryTag="intolerances"
                categoryPlaceholder="Intolerances"
                categoryOptions={intoleranceTypesOptions}
                otherFilters={ingredientFilters as OtherType}
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