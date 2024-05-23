import { observer } from "mobx-react-lite";
import * as React from "react";
import { useEffect, useCallback, useState } from "react";
import { useParams , useNavigate } from "react-router-dom";
import { imagePrefix } from "config/api";

import Button from "components/Button";
import ErrorBox from "components/ErrorBox";
import Text from "components/Text";
import Input from "components/Input";
import MultiDropdown from "components/MultiDropdown";
import ArrowLeftIcon from "components/icons/ArrowLeftIcon";

import { useLocalStore } from "hooks/useLocalStore";
import IngredientStore from "store/IngredientStore";
import urlStore from "store/UrlStore";
import styles from './Ingredient.module.scss';
import custom from 'styles/customStyles.module.scss';
import classNames from "classnames";

const Ingredient: React.FC = () => {

    const { id } = useParams();
    const [ numberId, setId ] = useState<number | undefined>();
    const navigate = useNavigate();
    const { 
        ingredient, amount, unit, setQueries,
        status,
        loadingIngredient} = useLocalStore(() => new IngredientStore());

    const getNumberId = useCallback(() => {
        setId(Number(id));
    }, [id]);

    useEffect(() => {
        getNumberId();
    }, [id]);

    useEffect(() => {
        if (numberId) {
            loadingIngredient(numberId);
        }
    }, [numberId]);

    const getNutritionByName = (name: string) => {
        const nut = ingredient.nutrition.nutrients.find((nutr) => nutr.name === name);
        if (!nut) {
            return '';
        }
        if (nut.amount) {
            return nut.amount + ' ' + nut.unit;
        }
    }

    const getImageUrl = (url: string, size: 100 | 250 | 500 = 500) => {
        return `${imagePrefix}ingredients_${size}x${size}/${url}`;
    }

    return (
        <div 
            className={classNames({
                [styles["ingredient"]]: true,
                [custom["margin_hor"]]: true,
            })}
        >
            <div className={styles["ingredient__header"]}>
                <ArrowLeftIcon
                    color='accent'
                    onClick={() => { 
                        navigate(urlStore.prevUrl);
                    }} 
                />
                <Text weight='bold' view='title'>
                    {ingredient.name}
                </Text>
            </div>
            {status.statusName === 'ERROR' ?
            <ErrorBox
                errorSlot={
                    <Button onClick={() => { 
                        navigate(urlStore.prevUrl);
                    }}>
                        Go back
                    </Button>}
            >
                {status.statusMessage}
            </ErrorBox>
            :
            <div className={styles["ingredient__box"]}>
                <div className={styles["ingredient__box__preview"]}>
                    <img src={getImageUrl(ingredient.image)} alt='ingredient photo' />
                    <div>
                        <div className={styles["ingredient__box__preview__form"]}>
                            <Input
                                value={amount}
                                type='number'
                                onChange={(value) => {
                                    setQueries(value, unit);
                                }}
                            />
                            {ingredient.possibleUnits.length > 0 &&
                            <MultiDropdown
                                value={unit}
                                onChange={(newValue) => {
                                    if (newValue.length === 1) {
                                        setQueries(amount, newValue);
                                    } else {
                                        setQueries(amount, [ { key: '0', value: '' } ]);
                                    }
                                }}
                                options={[ ...ingredient.possibleUnits.map((value, index) => ({
                                    key: (index + 1).toString(),
                                    value: value,
                                })) ]}
                                getTitle={(value) => {
                                    if (value.length >= 1) {
                                        return value.map((val) => val.value).join(', ');
                                    }
                                    return 'unit';
                                }}
                                selectMode='ONE'
                            />
                            }
                            <Button
                                onClick={() => {
                                    if (numberId) {
                                        loadingIngredient(numberId);
                                    }
                                }}
                            >
                                apply
                            </Button>
                        </div>    
                        <Text tag='div' view='p-18' weight='bold'>
                            {ingredient.estimatedCost.value}{' '}{ingredient.estimatedCost.unit}
                        </Text>
                        <Text tag='div' view='p-16'>
                            <b>Weight per serving:</b> {ingredient.nutrition.weightPerServing.amount}{' '}{ingredient.nutrition.weightPerServing.unit}
                        </Text>
                        <Text tag='div' view='p-16'>
                            <b>Aisle:</b> {ingredient.aisle}
                        </Text>
                        <Text tag='div' view='p-16'>
                            <b>Consistency:</b> {ingredient.consistency}
                        </Text>
                        <div className={styles["ingredient__box__preview__tags"]}>
                            {ingredient.categoryPath.map((tag) => {
                                return (
                                    <Text
                                        tag='div' view='p-14'
                                        className={styles["ingredient__box__preview__tags__tag"]}
                                    >
                                        {tag}
                                    </Text>
                                )
                            })}
                        </div>
                    </div>    
                </div>
                <div className={styles["ingredient__box__nutrinition"]}>
                    <Text tag='div' view='p-16' className={styles["ingredient__box__nutrinition__hed"]}>
                        Nutriens
                    </Text>
                    <div className={styles["ingredient__box__nutrinition__elements"]}>
                        <div>
                            <Text tag='div' view='p-14'>
                                Calories
                            </Text>
                            <Text tag='div' view='p-14'>
                                {getNutritionByName('Calories')}
                            </Text>   
                        </div>
                        <div>
                            <Text tag='div' view='p-14'>
                                Fat
                            </Text>
                            <Text tag='div' view='p-14'>
                                {getNutritionByName('Fat')}
                            </Text>   
                        </div>
                        <div>
                            <Text tag='div' view='p-14'>
                                Protein
                            </Text>
                            <Text tag='div' view='p-14'>
                                {getNutritionByName('Protein')}
                            </Text>   
                        </div>
                        <div>
                            <Text tag='div' view='p-14'>
                                Carbs
                            </Text>
                            <Text tag='div' view='p-14'>
                                {getNutritionByName('Carbs')}
                            </Text>   
                        </div>
                    </div>
                </div>
                <div className={styles["ingredient__box__nutrinition"]}>
                    <Text tag='div' view='p-16' className={styles["ingredient__box__nutrinition__hed"]}>
                        Properties
                    </Text>
                    <div className={styles["ingredient__box__nutrinition__elements"]}>
                        {ingredient.nutrition.properties.map((value, index) => {
                            return (
                                <div>
                                    <Text tag='div' view='p-14'>
                                        {value.name}
                                    </Text>
                                    <Text tag='div' view='p-14'>
                                        {[value.amount || '', value.unit || ''].join(' ')}
                                    </Text>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className={styles["ingredient__box__nutrinition"]}>
                    <Text tag='div' view='p-16' className={styles["ingredient__box__nutrinition__hed"]}>
                        Flavonoids
                    </Text>
                    <div className={styles["ingredient__box__nutrinition__elements"]}>
                        {ingredient.nutrition.flavonoids.map((value, index) => {
                            return (
                                <div>
                                    <Text tag='div' view='p-14'>
                                        {value.name}
                                    </Text>
                                    <Text tag='div' view='p-14'>
                                        {[value.amount || '0', value.unit || ''].join(' ')}
                                    </Text>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className={styles["ingredient__box__nutrinition"]}>
                    <Text tag='div' view='p-16' className={styles["ingredient__box__nutrinition__hed"]}>
                        Caloric Breakdown
                    </Text>
                    <div className={styles["ingredient__box__nutrinition__elements"]}>
                        {Object.entries(ingredient.nutrition.caloricBreakdown).map(([key, value], index) => {
                            return (
                                <div>
                                    <Text tag='div' view='p-14'>
                                        {key.substring(7)}
                                    </Text>
                                    <Text tag='div' view='p-14'>
                                        {value} %
                                    </Text>
                                </div>
                            )
                        })}    
                    </div>
                </div>
            </div>
            }
        </div>
    )
}

export default observer(Ingredient);