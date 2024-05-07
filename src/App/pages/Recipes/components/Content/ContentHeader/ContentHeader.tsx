import * as React from 'react';

import Text from 'components/Text';

import customStyles from 'styles/customStyles.module.scss';

const ContentHeader: React.FC = () => {

    return (
        <Text className={customStyles['text-align-center']} view='p-20' tag='div'>
            Find the perfect food and{' '} 
            <u>drink ideas</u>{' '}
            for every occasion, from{' '}
            <u>weeknight dinners</u> to{' '}
            <u>holiday feasts</u>.
        </Text>
    )
}

export default ContentHeader;