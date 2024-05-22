import { observer } from "mobx-react-lite";
import * as React from "react";
import { useEffect } from "react";
import Card from "components/Card";
import ContentFilters from "components/ContentFilters";
import ListShower from "components/ListShower";
import PageTemplate from "components/PageTemplate";
import { useLocalStore } from "hooks/useLocalStore";
import ProductListStore from "store/ProductListStore";
import searchStore from "store/SearchParamsStore";

const Products: React.FC = () => {

    const productStore = useLocalStore(() => new ProductListStore());

    useEffect(() => {
        const queryStr = searchStore.getParam('query');
        if (queryStr !== '') {
            productStore.loadingList(productStore.getUrl(
                searchStore.getOffset(), 
                searchStore.getParam('query'),
            ), 'products', 'totalProducts');
        }
    }, [searchStore.searchParams, productStore]);

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