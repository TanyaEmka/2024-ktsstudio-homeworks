import React, { useState } from "react";
import './PageController.scss';

import ArrowLeftIcon from "components/icons/ArrowLeftIcon";
import ArrowRightIcon from "components/icons/ArrowRightIcon";
import Text from "components/Text";

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

    const [items, setItems] = useState([1, 2, 3]);
    const [endItem, setEnd] = useState(pageCount);
    const lengtList = totalResults / pageCount;

    return (
        <div className="page-controller">
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
            <div className="page-controller-numbers">
                {items.map((number) => {
                    return (
                        <Text
                            key={number}
                            className={['page-controller-numbers-number',
                                        'page-controller-numbers-number-' + (selectedPage === number ? 'selected' : 'unselected')]
                                        .join(' ').trim()}
                            tag='div'
                            view='p-18'
                            onCLick={() => { onClick(number) }}
                        >{number}
                        </Text>
                    )
                })}
                <Text
                    className='page-controller-numbers-points'
                    tag='div'
                    view='p-18'
                >...
                </Text>
                <Text
                    className={['page-controller-numbers-number',
                                'page-controller-numbers-number-' + (selectedPage === pageCount ? 'selected' : 'unselected')]
                                .join(' ').trim()}
                    tag='div'
                    view='p-18'
                    onCLick={() => { onClick(pageCount) }}
                >{endItem}
                </Text>
            </div>
            <ArrowRightIcon
                color={selectedPage < lengtList ? 'primary' : 'secondary'} 
                onClick={() => {
                    if (items[2] < selectedPage + 1) {
                        setItems([items[0] + 3, items[1] + 3, items[2] + 3]);
                        setEnd(endItem + 3);
                    } else if (endItem < selectedPage + 1) {
                        setItems([items[0] + 3, items[1] + 3, items[2] + 3]);
                        setEnd(endItem + 3);
                    }
                    if (selectedPage < lengtList) {
                        onClick(selectedPage + 1);
                    }
                }}
            />
        </div>
    )
}

export default PageController;