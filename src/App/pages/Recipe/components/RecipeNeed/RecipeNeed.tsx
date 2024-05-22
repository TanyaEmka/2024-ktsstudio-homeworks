import * as React from "react";
import { memo } from "react";
import Text from "components/Text";
import styles from './RecipeNeed.module.scss';


type RecipeNeedProps = {
    name: string,
    elements: Array<string>,
    icon: React.ReactNode
    emptyMessage?: string,
}

const RecipeNeed: React.FC<RecipeNeedProps> = (props) => {

    return (
        <div className={styles["recipe__box__needs__block"]}>
            <Text view='p-20' weight='bold'>
                {props.name}
            </Text>
            <div className={styles["recipe__box__needs__block__elems"]}>
                {props.elements.length === 0 &&
                    <Text tag='div' view='p-16' color='secondary'>
                        {props.emptyMessage || 'Elements not listed'}
                    </Text>
                }
                {props.elements.map((element, index) => {
                    return (
                        <div key={[element, index].join(' ')}>
                            {props.icon}
                            <Text view='p-16'>{element}</Text>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default memo(RecipeNeed);