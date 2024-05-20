import * as React from "react";
import { memo } from "react";
import Text from "components/Text";
import { MealPlanDayType } from "types/apiTypes";
import SlotInfo from "../SlotInfo";
import styles from "./DayInfo.module.scss";

type DayInfoOtherType = {
    dayName: string,
}

const DayInfo: React.FC<MealPlanDayType & DayInfoOtherType> = (props) => {

    const breakfastItems = props.items.filter((item) => item.slot === 1);
    const lunchItems = props.items.filter((item) => item.slot === 2);
    const dinnerItems = props.items.filter((item) => item.slot === 3);

    const getNutritionByName = (name: string) => {
        const nut = props.nutritionSummary.nutrients.find((nutr) => nutr.name === name);
        if (!nut) {
            return '';
        }
        return nut.name + ': ' + nut.amount + ' ' + nut.unit;
    }

    return (
        <>
            <Text 
                className={styles["day-info__name"]}
                tag='div' view='p-16' weight='bold'
            >
                {props.dayName}
            </Text>
            <SlotInfo slots={breakfastItems} />
            <SlotInfo slots={lunchItems} />
            <SlotInfo slots={dinnerItems} />
            <div className={styles["day-info__summary"]}>
                <Text>{getNutritionByName('Calories')}</Text>
                <Text>{getNutritionByName('Fat')}</Text>
                <Text>{getNutritionByName('Protein')}</Text>
                <Text>{getNutritionByName('Carbs')}</Text>
            </div>
        </>
    )
}

export default memo(DayInfo);