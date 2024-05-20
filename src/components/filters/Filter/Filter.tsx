import * as React from "react";
import Text from "components/Text";
import styles from './Filter.module.scss';


interface FilterProps {
    name: string,
    children: React.ReactNode,
}

const Filter: React.FC<FilterProps> = (props) => {

    return (
        <div className={styles['filter']}>
            <Text view='p-16' weight='bold'>
                {props.name}
            </Text>
            <div className={styles['filter__form']}>
                {props.children}
            </div>
        </div>
    )
}

export default Filter;