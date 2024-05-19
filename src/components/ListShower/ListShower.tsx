import * as React from 'react';
import { Status } from 'types/apiTypes';
import ErrorBox from 'components/ErrorBox';
import Text from 'components/Text';
import PageController from 'components/PageController';
import styles from './ListShower.module.scss';
import searchStore from 'store/SearchParamsStore';

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
            {status.statusName === 'ERROR' ?
            <ErrorBox>
                {status.statusMessage}
            </ErrorBox>
            : status.statusName === 'LOADING' ?
            <Text>Loading...</Text>
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