import * as React from "react";
import { MealPlanWeekType } from "types/apiTypes";
import Text from "components/Text";
import DayInfo from "../DayInfo";
import { memo } from "react";
import styles from './WeekInfo.module.scss';

interface WeekInfoProps {
    plan: MealPlanWeekType,
    weekStart?: string,
}

const weekDays = [
    'Monday', 
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
];

const WeekInfo: React.FC<WeekInfoProps> = (props) => {

    const emptyDays = Array(7 - props.plan.days.length).fill(0);

    return (
        <div className={styles["week-info"]}>
            <Text 
                className={styles["week-info__header"]}
                tag='div' view='p-18' weight="bold"
            >
                Current week
            </Text>
            <div className={styles["week-info__days"]}>
                {props.plan.days.map((day, index) => {
                    return (
                        <DayInfo 
                            dayName={weekDays[index]}
                            {...day} 
                        />
                    )
                })}
            </div>
        </div>    
    )
}

export default memo(WeekInfo);