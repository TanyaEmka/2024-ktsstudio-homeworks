import * as React from "react";
import PageTemplate from "components/PageTemplate";
import localStorage from "store/LocalStorage";
import { SuccessfulStatus } from "config/initValues";
import ListShower from "components/ListShower";
import { observer } from "mobx-react-lite";
import RecipeCard from "components/RecipeCard";

const Saved: React.FC = () => {

    const { cards } = localStorage;

    return (
        <PageTemplate headerName="Saved">
            <ListShower
                status={SuccessfulStatus}
            >   
                {cards.map((recipe) => {
                    return (
                        <RecipeCard
                            key={recipe.id} 
                            mode='SAVED'
                            recipe={recipe}
                        />
                    )
                })}
            </ListShower>
        </PageTemplate>
    )
}

export default observer(Saved);