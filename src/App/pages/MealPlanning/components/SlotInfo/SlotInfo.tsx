import * as React from "react";
import { MealPlanCommonItemType } from "types/apiTypes";
import Text from "components/Text";
import { imagePrefix } from "config/api";
import { memo } from "react";
import styles from "./SlotInfo.module.scss";

interface SlotInfoProps {
    slots: MealPlanCommonItemType[]
}

const SlotInfo: React.FC<SlotInfoProps> = (props) => {

    const elements = props.slots.sort((a, b) => {
        return (a.position < b.position) ? -1 : 0;
    });

    const getItemElementByType = (item: MealPlanCommonItemType) => {
        if (item.type !== 'INGREDIENTS') {
            let imgUrl = imagePrefix;
            switch(item.type) {
                case 'PRODUCT':
                    imgUrl += 'products/' + item.value.id + '-90x90.' + item.value.imageType;
                    break;
                case 'MENU_ITEM':
                    imgUrl += 'menu-items/' + item.value.id + '-90x90.' + item.value.imageType;
                    break;
                case 'RECIPE':
                    imgUrl += 'recipes/' + item.value.id + '-240x150.' + item.value.imageType;
                    break;
                case 'CUSTOM_FOOD':
                    break;
                default:
                    break;
            }
            return (
                <>
                    <img src={imgUrl} alt={item.value.title} />
                    <Text>{item.value.title}</Text>
                </>
            )
        } else {
            return (
                <>
                    {item.value.ingredients.map((ing, index) => {
                        return (
                            <div className={styles["slot-info__item__ingr"]} key={index}>
                                <img src={ing.image} alt={ing.name} />
                                <Text>{ing.amount}{' '}{ing.name}{' '}{ing.unit}</Text>
                            </div>
                        )
                    })}
                </>
            )
        }
    }

    return (
        <div className={styles["slot-info"]}>
            {elements.map((slot, index) => {
                return (
                    <div className={styles["slot-info__item"]} key={slot.type + index}>
                        {getItemElementByType(slot)}
                    </div>
                )
            })}
        </div>
    )
}

export default memo(SlotInfo);