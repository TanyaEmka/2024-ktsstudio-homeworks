import classNames from "classnames";
import * as React from "react";
import { useEffect } from "react";
import Text from "components/Text";
import ArrowLeftIcon from "components/icons/ArrowLeftIcon";
import ArrowRightIcon from "components/icons/ArrowRightIcon";
import styles from './PageController.module.scss';
import { useLocalStore } from "hooks/useLocalStore";
import PageControllerStore from "store/PageControllerStore";

type PageControllerProps = {
    selectedPage: number,
    pageCount: number,
    totalResults: number,
    onClick: (page: number) => void,
}

const PageController: React.FC<PageControllerProps> = ({
    selectedPage,
    pageCount,
    totalResults,
    onClick
}) => {

    const { 
        items, endItem, 
        setItems, setEnd 
    } = useLocalStore(() => new PageControllerStore());
    const lengthList = totalResults / pageCount;

    useEffect(() => {
        setEnd(pageCount);
    }, []);

    return (
        <div className={styles["page-controller"]}>
            <ArrowLeftIcon 
                color={selectedPage > 1 ? 'primary' : 'secondary'}
                onClick={() => {
                    if (selectedPage > 1) {
                        if (items[0] > selectedPage - 1) {
                            setItems([items[0] - 3, items[1] - 3, items[2] - 3]);
                            setEnd(endItem - 3);
                        }
                        onClick(selectedPage - 1);
                    }
                }}
            />
            <div className={styles["page-controller__numbers"]}>
                {items.map((number) => {
                    return (
                        <Text
                            key={number}
                            className={classNames({
                                [styles["page-controller__numbers__number"]]: true,
                                [styles["page-controller__numbers__number_selected"]]: selectedPage === number,
                            })}
                            tag='div'
                            view='p-18'
                            onCLick={() => { onClick(number) }}
                        >
                            {number}
                        </Text>
                    )
                })}
                <Text
                    className={styles['page-controller__numbers__points']}
                    tag='div'
                    view='p-18'
                >
                    ...
                </Text>
                <Text
                    className={classNames({
                        [styles["page-controller__numbers__number"]]: true,
                        [styles["page-controller__numbers__number_selected"]]: selectedPage === pageCount,
                    })}
                    tag='div'
                    view='p-18'
                    onCLick={() => { onClick(pageCount) }}
                >
                    {endItem}
                </Text>
            </div>
            <ArrowRightIcon
                color={selectedPage < lengthList ? 'primary' : 'secondary'} 
                onClick={() => {
                    if (items[2] < selectedPage + 1) {
                        setItems([items[0] + 3, items[1] + 3, items[2] + 3]);
                        setEnd(endItem + 3);
                    } else if (endItem < selectedPage + 1) {
                        setItems([items[0] + 3, items[1] + 3, items[2] + 3]);
                        setEnd(endItem + 3);
                    }
                    if (selectedPage < lengthList) {
                        onClick(selectedPage + 1);
                    }
                }}
            />
        </div>
    )
}

export default PageController;