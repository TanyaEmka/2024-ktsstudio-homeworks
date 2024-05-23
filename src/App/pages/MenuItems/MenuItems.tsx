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
import { NotStartedStatus } from "config/initValues";
import { MenuItemUnit } from "types/apiTypes";

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
        } else if (query === '') {
            menuItemsStore.setResultRequest([], 0);
            menuItemsStore.setStatus(NotStartedStatus);
        }
    }, [menuItemsStore, url]);

    useEffect(() => {
        getUrl();
    }, [searchStore.searchParams]);

    useEffect(() => {
        loadList();
    }, [url]);

    const getSubTitle = (menuItem: MenuItemUnit) => {
        let prevStrArr = [];
        if (menuItem.servings.number !== null) {
            prevStrArr.push(menuItem.servings.number);
        }
        if (menuItem.servings.size !== null) {
            prevStrArr.push(menuItem.servings.size);
        }
        const prevStr = prevStrArr.join('x');
        if (menuItem.servings.unit !== null) {
            return [prevStr, menuItem.servings.unit].join(' ');
        } else {
            return prevStr;
        }
    }

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
                            subtitle={getSubTitle(menuItem)}
                        />
                    )
                })}
            </ListShower>
        </PageTemplate>
    )
}

export default observer(MenuItems);