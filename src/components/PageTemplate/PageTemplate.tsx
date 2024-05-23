import * as React from 'react';
import Text from 'components/Text';
import styles from './PageTemplate.module.scss';
import custom from 'styles/customStyles.module.scss';
import classNames from 'classnames';


interface PageTemplateProps {
    headerName: string,
    children: React.ReactNode,
}

const PageTemplate: React.FC<PageTemplateProps> = (props) => {

    return (
        <div 
            className={classNames({
                [styles['page-template']]: true,
                [custom['margin_top_hor']]: true,
            })}
        >
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