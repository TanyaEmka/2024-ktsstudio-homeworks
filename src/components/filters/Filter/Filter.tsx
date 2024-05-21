import * as React from "react";
import Text from "components/Text";
import styles from './Filter.module.scss';


interface FilterProps {
    name: string,
    children: React.ReactNode,
    flexDirection?: 'column' | 'row',
}

const Filter: React.FC<FilterProps> = ({
    name,
    children,
    flexDirection='column'
}) => {

    return (
        <div 
            style={{
                flexDirection: flexDirection
            }}
            className={styles['filter']}
        >
            <Text view='p-16' weight='bold'>
                {name}
            </Text>
            <div className={styles['filter__form']}>
                {children}
            </div>
        </div>
    )
}

export default Filter;