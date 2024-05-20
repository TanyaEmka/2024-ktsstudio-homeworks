import * as React from 'react';
import Text from 'components/Text';
import styles from './PageTemplate.module.scss';


interface PageTemplateProps {
    headerName: string,
    children: React.ReactNode,
}

const PageTemplate: React.FC<PageTemplateProps> = (props) => {

    return (
        <div className={styles['page-template']}>
            <Text 
                view='title'
                className={styles['page-template__name']}
            >
                {props.headerName}
            </Text>
            <div className={styles['page-template__content']}>
                {props.children}
            </div>
        </div>
    )
}

export default PageTemplate;