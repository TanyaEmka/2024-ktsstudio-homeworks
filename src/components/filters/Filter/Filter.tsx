import * as React from "react";
import styles from './Filter.module.scss';

import Text from "components/Text";

interface FilterProps {
    name: string,
    children: React.ReactNode,
}

const Filter: React.FC<FilterProps> = (props) => {

    return (
        <div className={styles['filter']}>
            <Text view='p-16' weight='bold'>
                {props.name}{': '}
            </Text>
            <div className={styles['filter-form']}>
                {props.children}
            </div>
        </div>
    )
}

export default Filter;