import * as React from 'react';
import ErrorBox from 'components/ErrorBox';
import Loader from 'components/Loader';
import PageController from 'components/PageController';
import Text from 'components/Text';
import searchStore from 'store/SearchParamsStore';
import { Status } from 'types/apiTypes';
import styles from './ListShower.module.scss';

interface ListShowerProps {
    status: Status,
    totalCount?: number,
    children: React.ReactNode,
}

const ListShower: React.FC<ListShowerProps> = ({
    status,
    totalCount=0,
    children
}) => {

    const pageControllerClick = (page: number) => {
        searchStore.setSearchParam('page', page.toString());
    }
    
    return (
        <>
            {status.statusName === 'NOT_STARTED' ?
            <Text tag='div' view='p-20' color='secondary'>
                Try searching!
            </Text>
            : status.statusName === 'ERROR' ?
            <ErrorBox>
                {status.statusMessage}
            </ErrorBox>
            : status.statusName === 'LOADING' ?
            <Loader />
            :
            <>
                <div className={styles['list-shower']}>
                    {children}
                </div>
                {totalCount > 0 &&
                <PageController 
                    selectedPage={Number(searchStore.getNumberParam('page'))}
                    totalResults={totalCount}
                    onClick={pageControllerClick}
                />
                }
            </>
            }
        </>    
    )
}

export default ListShower;