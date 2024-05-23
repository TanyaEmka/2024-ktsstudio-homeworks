import { observer } from "mobx-react-lite";
import * as React from "react";
import { useEffect, useCallback, useState } from "react";
import Card from "components/Card";
import ContentFilters from "components/ContentFilters";
import ListShower from "components/ListShower";
import PageTemplate from "components/PageTemplate";
import { useLocalStore } from "hooks/useLocalStore";
import MenuItemListStore from "store/MenuItemListStore";
import searchStore from "store/SearchParamsStore";

const MenuItems: React.FC = () => {

    const menuItemsStore = useLocalStore(() => new MenuItemListStore());
    const [ url, setUrl ] = useState<string | undefined>();

    const getUrl = useCallback(() => {
        const newUrl = menuItemsStore.getUrl(
            searchStore.getOffset(),
            searchStore.getParam('query'),
        )
        setUrl(newUrl);
    }, [menuItemsStore, searchStore.searchParams]);

    const loadList = useCallback(() => {
        const query = searchStore.getParam('query');
        if (url && query !== '') {
            menuItemsStore
                .loadingList(url, 'menuItems', 'totalMenuItems');
        }
    }, [menuItemsStore, url]);

    useEffect(() => {
        getUrl();
    }, [searchStore.searchParams]);

    useEffect(() => {
        loadList();
    }, [url]);

    return (
        <PageTemplate headerName="Menu Items">
            <ContentFilters 
                inputPlaceholder="Enter menu items"
                emptyError={true}
            />
            <ListShower 
                status={menuItemsStore.status}
                totalCount={menuItemsStore.total}
            >
                {menuItemsStore.results.map((menuItem) => {
                    return (
                        <Card 
                            key={menuItem.id}
                            image={menuItem.image}
                            title={[menuItem.title, menuItem.restaurantChain].join(' - ')}
                            subtitle={`${menuItem.servings.number}x${menuItem.servings.size} ${menuItem.servings.unit}`}
                        />
                    )
                })}
            </ListShower>
        </PageTemplate>
    )
}

export default observer(MenuItems);