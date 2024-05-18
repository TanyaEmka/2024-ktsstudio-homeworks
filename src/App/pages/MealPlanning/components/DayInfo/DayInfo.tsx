import * as React from "react";
import { MealPlanDayType } from "types/apiTypes";
import SlotInfo from "./components/SlotInfo";

const DayInfo: React.FC<MealPlanDayType> = (props) => {

    const breakfastItems = props.items.filter((item) => item.slot === 1);
    const lunchItems = props.items.filter((item) => item.slot === 2);
    const dinnerItems = props.items.filter((item) => item.slot === 3);

    return (
        <div className="day-info">
            <SlotInfo slots={breakfastItems} />
            <SlotInfo slots={lunchItems} />
            <SlotInfo slots={dinnerItems} />
        </div>
    )
}

export default DayInfo;