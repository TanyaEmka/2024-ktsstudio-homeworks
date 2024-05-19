import * as React from "react";
import { useEffect } from "react";
import PageTemplate from "components/PageTemplate";
import { useLocalStore } from "hooks/useLocalStore";
import Card from "components/Card";
import { observer } from "mobx-react-lite";
import MenuItemListStore from "store/MenuItemListStore";
import ListShower from "components/ListShower";
import searchStore from "store/SearchParamsStore";
import ContentFilters from "components/ContentFilters";

const MenuItems: React.FC = () => {

    const menuItemsStore = useLocalStore(() => new MenuItemListStore());

    useEffect(() => {
        const queryStr = searchStore.getParam('query');
        if (queryStr !== '') {
            menuItemsStore.loadingList(menuItemsStore.getUrl(
                searchStore.getOffset(),
                searchStore.getParam('query'),
            ), 'menuItems', 'totalMenuItems');
        }
    }, [searchStore.searchParams, menuItemsStore]);

    return (
        <PageTemplate headerName="Menu Items">
            <ContentFilters 
                inputPlaceholder="Enter menu items"
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