import * as React from "react";
import { useEffect } from "react";
import PageTemplate from "components/PageTemplate";
import { useLocalStore } from "hooks/useLocalStore";
import Card from "components/Card";
import { useSearchParams } from "react-router-dom";
import { getOffset, getAllKeyValue } from "utils/searchParamsHandlers";
import { observer } from "mobx-react-lite";
import ProductListStore from "store/ProductListStore";
import ListShower from "components/ListShower";

const Products: React.FC = () => {

    const productStore = useLocalStore(() => new ProductListStore());
    const [ searchParams, setSearchParams ] = useSearchParams();

    useEffect(() => {
        productStore.loadingList(productStore.getUrl(
            getOffset(searchParams), 'a',
            ...getAllKeyValue(searchParams),
        ), 'products', 'totalProducts');
    }, [searchParams, productStore]);

    return (
        <PageTemplate headerName="Products">
            <div className="ingredients">
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
            </div>
        </PageTemplate>
    )
}

export default observer(Products);