import * as React from 'react';
import { memo } from 'react';

import Text from 'components/Text';

import customStyles from 'styles/customStyles.module.scss';
import classNames from 'classnames';

const ContentHeader: React.FC = () => {

    return (
        <Text 
            tag='div' 
            className={classNames({
                [customStyles['text-align-center']]: true,
                [customStyles['text-responsive']]: true,
            })}
        >
            Find the perfect food and{' '} 
            <u>drink ideas</u>{' '}
            for every occasion, from{' '}
            <u>weeknight dinners</u> to{' '}
            <u>holiday feasts</u>.
        </Text>
    )
}

export default memo(ContentHeader);