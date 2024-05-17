import * as React from 'react';
import { Status } from 'types/apiTypes';
import ErrorBox from 'components/ErrorBox';
import Text from 'components/Text';
import PageController from 'components/PageController';
import { useSearchParams } from 'react-router-dom';
import { getSearchParam } from 'utils/searchParamsHandlers';
import styles from './ListShower.module.scss';

interface ListShowerProps {
    status: Status,
    totalCount: number,
    children: React.ReactNode,
}

const ListShower: React.FC<ListShowerProps> = (props) => {

    const { status, totalCount, children } = props;
    const [ searchParams, setSearchParams ] = useSearchParams();

    const pageControllerClick = (page: number) => {
        searchParams.set('page', page.toString());
        setSearchParams(searchParams);
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
                    selectedPage={Number(getSearchParam(searchParams, 'page', '1'))}
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