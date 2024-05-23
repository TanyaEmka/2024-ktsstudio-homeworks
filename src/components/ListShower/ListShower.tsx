import * as React from 'react';
import ErrorBox from 'components/ErrorBox';
import Loader from 'components/Loader';
import PageController from 'components/PageController';
import Text from 'components/Text';
import searchStore from 'store/SearchParamsStore';
import { Status } from 'types/apiTypes';
import styles from './ListShower.module.scss';
import { useSearchParams } from 'react-router-dom';

interface ListShowerProps {
    status: Status,
    totalCount?: number,
    emptyName?: string,
    children: React.ReactNode,
    pagination?: boolean,
}

const ListShower: React.FC<ListShowerProps> = ({
    status,
    totalCount=0,
    emptyName='No results. Try other filtres',
    children,
    pagination=true,
}) => {

    const [ _, setSearchParams ] = useSearchParams();

    const pageControllerClick = (page: number) => {
        searchStore.setSearchParam('page', page.toString());
        setSearchParams(searchStore.searchParamURL);
    }

    const getSelectedPage = () => {
        let selected = Number(searchStore.getNumberParam('page'));
        if (selected <= 0) {
            selected = 1;
        }
        return selected;
    }
    
    return (
        <>
            {status.statusName === 'NOT_STARTED' ?
            <Text 
                tag='div' view='p-20' color='secondary'
                className={styles['list-shower__empty']}
            >
                Try searching!
            </Text>
            : status.statusName === 'ERROR' ?
            <ErrorBox>
                {status.statusMessage}
            </ErrorBox>
            : status.statusName === 'LOADING' ?
            <div className={styles['list-shower__empty']}>
                <Loader />
            </div>
            :
            totalCount > 0 ?
            <>
                <div className={styles['list-shower']}>
                    {children}
                </div>
                { totalCount > 9 && pagination &&
                <PageController 
                    selectedPage={getSelectedPage()}
                    totalResults={totalCount}
                    onClick={pageControllerClick}
                />
                }
            </>
            :
            <Text 
                tag='div' view='p-20' color='secondary'
                className={styles['list-shower__empty']}
            >
                {emptyName}
            </Text>
            }
        </>    
    )
}

export default ListShower;