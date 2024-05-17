import * as React from "react";
import PageTemplate from "components/PageTemplate";
import Card from "components/Card";
import localStorage from "store/LocalStorage";
import { SuccessfulStatus } from "config/initValues";
import ListShower from "components/ListShower";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Button from "components/Button";
import TimeIcon from "components/icons/TimeIcon";

const Saved: React.FC = () => {

    const { cards, deleteRecipe } = localStorage;
    const navigate = useNavigate();

    console.log(cards);

    const navigateToRecipePage = (id: number) => {
        navigate('/recipe/' + id);
    }

    const deleteSavedCard = (id: number) => {
        deleteRecipe(id);
    }

    return (
        <PageTemplate headerName="Saved">
            <ListShower
                status={SuccessfulStatus}
                totalCount={cards.length}
            >   
                {cards.map((recipe) => {
                    return (
                        <Card 
                            onClick={() => { navigateToRecipePage(recipe.id) }}
                            key={recipe.id}
                            image={recipe.image}
                            captionSlot={
                                <span className="content__cards__card__time">
                                    <TimeIcon />
                                    <span>{recipe.readyInMinutes} minutes</span>
                                </span>
                            }
                            title={recipe.title}
                            subtitle={recipe.describe}
                            contentSlot={recipe.kcal}
                            actionSlot={
                                <Button onClick={() => { deleteSavedCard(recipe.id) }}>
                                    Delete
                                </Button>
                            }
                        />
                    )
                })}
            </ListShower>
        </PageTemplate>
    )
}

export default observer(Saved);