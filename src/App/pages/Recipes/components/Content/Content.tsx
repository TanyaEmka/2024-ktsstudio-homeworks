import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Option } from "components/MultiDropdown";
import Button from "components/Button";
import Card from "components/Card";
import ErrorBox from "components/ErrorBox";
import Text from "components/Text";
import TimeIcon from "components/icons/TimeIcon";
import { apiKey } from "config/api";
import { RecipeListRequest, RecipeUnit } from "config/apiTypes";
import customStyles from 'styles/customStyles.module.scss';
import ContentFilters from "../ContentFilters";
import PageController from "../PageController";
import styles from './Content.module.scss';
import { useLocalStore } from "hooks/useLocalStore";
import RecipeListStore from "store/RecipeListStore";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";
import recipeApi from "query/RecipeQuery";
import { Status } from "config/apiTypes";

const Content: React.FC = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState<Option[]>([]);
    const navigate = useNavigate();

    const getCategoryString = () => {
        let result = category.map((cat) => ['type', cat.value].join('='));
        return result.join('&');
    }

    const getOffset = () => {
        return ((Number(searchParams.get('page') || '1') - 1) * 9).toString();    
    }

    const { 
        recipeList: data, status, 
        setRecipeList, setStatus } = useLocalStore(() => new RecipeListStore());

    recipeApi.hooks.useGetRecipeList(
        (newData: RecipeListRequest) => { setRecipeList(newData) },
        (status: Status) => { setStatus(status) },
        { offset: getOffset(), apiKey: apiKey, query: search, types: getCategoryString() },
        [search, apiKey, getCategoryString(), getOffset()],
    );

    const getKcal = (recipe: RecipeUnit) => {
        const recipeKcal = recipe.nutrition.nutrients
            .filter((obj) => obj.name === 'Calories')[0];

        return [Math.ceil(recipeKcal.amount), recipeKcal.unit].join(' ');
    }

    const getDescribe = (recipe: RecipeUnit) => {
        const ings = recipe.nutrition.ingredients;

        return ings.map((ing) => ing.name).join(' + ');
    }

    React.useEffect(() => {
        console.log(...category.map((cat) => cat.value));
    }, [category])

    return (
        <div className={styles["content"]}>
            <Text className={styles["content__header"]} view='p-20' tag='div'>
                Find the perfect food and
                {' '} 
                <span className={customStyles["line"]}>drink ideas</span>
                {' '}
                for every occasion, from
                {' '}
                <span className={customStyles["line"]}>weeknight dinners</span> to
                {' '}
                <span className={customStyles["line"]}>holiday feasts</span>.
            </Text>
            <ContentFilters 
                search={search}
                setSearch={(value) => { setSearch(value) }}
                category={category}
                setCategory={(value) => { setCategory(value) }}
            />
            {status.statusName === 'ERROR' ? 
            <ErrorBox>
                {status.statusMessage}
            </ErrorBox>
            :
            <>
                <div className={styles["content__cards"]}>
                    {data.results.map((recipe: any) => {
                        return (
                            <Card 
                                onClick={() => { if (recipe) navigate('/recipe/' + recipe?.id) }}
                                key={recipe?.id}
                                image={recipe?.image}
                                captionSlot={
                                    <span className={styles["content__cards__card__time"]}>
                                        <TimeIcon />
                                        <span>{recipe?.readyInMinutes} minutes</span>
                                    </span>
                                }
                                title={recipe.title}
                                subtitle={recipe ? getDescribe(recipe): '...'}
                                contentSlot={recipe ? getKcal(recipe) : ''}
                                actionSlot={<Button>Save</Button>}
                            />
                        )
                    }) || ''}
                </div>
                <PageController 
                    pageCount={9}
                    selectedPage={Number(searchParams.get('page') || '1')}
                    totalResults={data.totalResults}
                    onClick={(page: number) => { setSearchParams({ page: page.toString() }) }}
                />
            </>
            }
        </div>
    )
}

export default observer(Content);