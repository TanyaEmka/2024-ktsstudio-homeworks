import { observer } from "mobx-react-lite";
import * as React from "react";
import ListShower from "components/ListShower";
import PageTemplate from "components/PageTemplate";
import RecipeCard from "components/RecipeCard";
import { SuccessfulStatus } from "config/initValues";
import localStorage from "store/LocalStorage";

const Saved: React.FC = () => {

    return (
        <PageTemplate headerName="Saved">
            <ListShower
                status={SuccessfulStatus}
                emptyName="Nothind added to saved"
                totalCount={localStorage.cards.length}
            >   
                {localStorage.cards.map((recipe) => {
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