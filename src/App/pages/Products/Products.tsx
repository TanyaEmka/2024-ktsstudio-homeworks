import { observer } from "mobx-react-lite";
import * as React from "react";
import { useEffect, useCallback, useState } from "react";
import Card from "components/Card";
import ContentFilters from "components/ContentFilters";
import ListShower from "components/ListShower";
import PageTemplate from "components/PageTemplate";
import { useLocalStore } from "hooks/useLocalStore";
import ProductListStore from "store/ProductListStore";
import searchStore from "store/SearchParamsStore";
import { NotStartedStatus } from "config/initValues";

const Products: React.FC = () => {

    const productStore = useLocalStore(() => new ProductListStore());
    const [ url, setUrl ] = useState<string | undefined>();

    const getUrl = useCallback(() => {
        const newUrl = productStore.getUrl(
            searchStore.getOffset(), 
            searchStore.getParam('query'),
        )
        setUrl(newUrl);
    }, [productStore, searchStore.searchParams]);

    const loadList = useCallback(() => {
        const query = searchStore.getParam('query');
        if (url && query !== '') {
            productStore
                .loadingList(url, 'products', 'totalProducts');
        } else if (query === '') {
            productStore.setResultRequest([], 0);
            productStore.setStatus(NotStartedStatus);
        }
    }, [productStore, url]);

    useEffect(() => {
        getUrl();
    }, [searchStore.searchParams]);

    useEffect(() => {
        loadList();
    }, [url]);

    return (
        <PageTemplate headerName="Products">
            <ContentFilters 
                inputPlaceholder="Enter products"
                emptyError={true}
            />
            <ListShower 
                status={productStore.status}
                totalCount={productStore.total}
            >
                {productStore.results.map((product) => {
                return (
                    <Card 
                        key={product.id}
                        image={product.image}
                        title={product.title}
                        subtitle={''}
                    />
                )
                })}
            </ListShower>
        </PageTemplate>
    )
}

export default observer(Products);