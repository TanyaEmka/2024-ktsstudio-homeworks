import { observer } from "mobx-react-lite";
import * as React from "react";
import { useEffect, useCallback, useState } from "react";
import Card from "components/Card";
import ContentFilters from "components/ContentFilters";
import { OtherType } from "components/ContentFilters/ContentFilters";
import ListShower from "components/ListShower";
import PageTemplate from "components/PageTemplate";
import { intoleranceTypesOptions , ingredientFilters } from "config/api";
import { useLocalStore } from "hooks/useLocalStore";
import IngredientListStore from "store/IngredientListStore";
import searchStore from "store/SearchParamsStore";
import { useNavigate } from "react-router-dom";
import { NotStartedStatus } from "config/initValues";


const Ingredients: React.FC = () => {

    const ingredientStore = useLocalStore(() => new IngredientListStore());
    const [ url, setUrl ] = useState<string | undefined>();
    const navigate = useNavigate();

    const getUrl = useCallback(() => {
        const newUrl = ingredientStore.getUrl(
            searchStore.getOffset(),
            searchStore.getParam('query'),
            searchStore.getParamPair('intolerances'),
        )
        setUrl(newUrl);
    }, [ingredientStore, searchStore.searchParams]);

    const loadList = useCallback(() => {
        const query = searchStore.getParam('query');
        if (url && query !== '') {
            ingredientStore.loadingList(url);
        } else if (query === '') {
            ingredientStore.setResultRequest([], 0);
            ingredientStore.setStatus(NotStartedStatus);
        }
    }, [ingredientStore, url]);

    useEffect(() => {
        getUrl();
    }, [searchStore.searchParams]);

    useEffect(() => {
        loadList();
    }, [url]);

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
                            onClick={() => {
                                navigate('/ingredient/' + ingredient.id);
                            }}
                        />
                    )
                })}
            </ListShower>
        </PageTemplate>
    )
}

export default observer(Ingredients);