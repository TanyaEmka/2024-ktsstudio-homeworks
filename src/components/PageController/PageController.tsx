import classNames from "classnames";
import { observer } from "mobx-react-lite";
import * as React from "react";
import Text from "components/Text";
import ArrowLeftIcon from "components/icons/ArrowLeftIcon";
import ArrowRightIcon from "components/icons/ArrowRightIcon";
import { useLocalStore } from "hooks/useLocalStore";
import PageControllerStore from "store/PageControllerStore";
import styles from './PageController.module.scss';

type PageControllerProps = {
    selectedPage: number,
    totalResults: number,
    onClick: (page: number) => void,
}

const PageController: React.FC<PageControllerProps> = ({
    selectedPage,
    totalResults,
    onClick
}) => {

    const { 
        getPointsArray, 
        total 
    } = useLocalStore(() => new PageControllerStore(totalResults));

    console.log(selectedPage, total);

    const goBack = () => {
        if (selectedPage > 1) {
            onClick(selectedPage - 1);
        }
    }

    const goNext = () => {
        if (selectedPage < total) {
            onClick(selectedPage + 1);
        }
    }

    const selectPage = (pageNumber: number) => {
        onClick(pageNumber);
    }

    return (
        <div className={styles["page-controller"]}>
            <ArrowLeftIcon 
                color={selectedPage > 1 ? 'primary' : 'secondary'}
                onClick={goBack}
                style={{ cursor: 'pointer' }}
            />
            <div className={styles["page-controller__numbers"]}>
                {getPointsArray(selectedPage).map((number) => {
                    if (number === 0) {
                        return (
                            <Text
                                key={number} tag='div' view='p-18'
                                className={styles['page-controller__numbers__points']}
                            >
                                ...
                            </Text>
                        )
                    }

                    return (
                        <Text
                            key={number} tag='div' view='p-18'
                            className={classNames({
                                [styles["page-controller__numbers__number"]]: true,
                                [styles["page-controller__numbers__number_selected"]]: selectedPage === number,
                            })}
                            onCLick={() => { selectPage(number) }}
                        >
                            {number}
                        </Text>
                    )
                })}
            </div>
            <ArrowRightIcon
                color={selectedPage < total ? 'primary' : 'secondary'} 
                onClick={goNext}
                style={{ cursor: "pointer" }}
            />
        </div>
    )
}

export default observer(PageController);