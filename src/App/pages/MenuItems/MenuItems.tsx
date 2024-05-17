import * as React from "react";
import { useEffect } from "react";
import PageTemplate from "components/PageTemplate";
import { useLocalStore } from "hooks/useLocalStore";
import Card from "components/Card";
import { useSearchParams } from "react-router-dom";
import { getOffset, getAllKeyValue } from "utils/searchParamsHandlers";
import { observer } from "mobx-react-lite";
import MenuItemListStore from "store/MenuItemListStore";
import ListShower from "components/ListShower";

const MenuItems: React.FC = () => {

    const menuItemsStore = useLocalStore(() => new MenuItemListStore());
    const [ searchParams, setSearchParams ] = useSearchParams();

    useEffect(() => {
        menuItemsStore.loadingList(menuItemsStore.getUrl(
            getOffset(searchParams), 'burger',
            ...getAllKeyValue(searchParams),
        ), 'menuItems', 'totalMenuItems');
    }, [searchParams, menuItemsStore]);

    return (
        <PageTemplate headerName="Menu Items">
            <div className="menu-items">
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
            </div>
        </PageTemplate>
    )
}

export default observer(MenuItems);