import * as React from "react";
import './Card.scss';

import Text from '../Text';

export type CardProps = {
    /** Дополнительный classname */
    className?: string,
    /** URL изображения */
    image: string;
    /** Слот над заголовком */
    captionSlot?: React.ReactNode;
    /** Заголовок карточки */
    title: React.ReactNode;
    /** Описание карточки */
    subtitle: React.ReactNode;
    /** Содержимое карточки (футер/боковая часть), может быть пустым */
    contentSlot?: React.ReactNode;
    /** Клик на карточку */
    onClick?: React.MouseEventHandler;
    /** Слот для действия */
    actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = (props) => {

    return (
        <div 
            className={['card', props.className].join(' ').trim()}
            onClick={props.onClick}
        >
            <img className='card-img' alt='товар' src={props.image} />
            <div className='card-info'>
                <div className='card-info-text'>
                    {props.captionSlot ?
                        <Text tag='p' view='p-14' weight='medium' color='secondary'>
                            {props.captionSlot}
                        </Text> : <></>
                    }
                    <Text 
                        className='card-info-text-title' 
                        tag='p' view='p-20' weight='medium'
                    >
                        {props.title}
                    </Text>
                    <Text 
                        className='card-info-text-subtitle' 
                        tag='p' view='p-16' color='secondary'
                    >
                        {props.subtitle}
                    </Text>
                </div>
                <div className='card-info-slot'>
                    {props.contentSlot ?
                        <Text className='card-info-slot-content' tag='div' view='p-18' weight='bold'>
                            {props.contentSlot}
                        </Text> : <></>
                    }
                    {props.actionSlot}
                </div>
            </div>
        </div>
    )
};

export default Card;
