import classNames from "classnames";
import * as React from "react";
import Text from '../Text';
import styles from './Card.module.scss';


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
            className={classNames({
                [props.className || '']: true,
                [styles.card]: true, 
            })}
            onClick={props.onClick}
        >
            <img className={styles['card__img']} alt='товар' src={props.image} />
            <div className={styles['card__info']}>
                <div className={styles['card__info__text']}>
                    {props.captionSlot &&
                        <Text tag='p' view='p-14' weight='medium' color='secondary'>
                            {props.captionSlot}
                        </Text>
                    }
                    <Text 
                        className={styles['card__info__text__title']}
                        tag='p' view='p-20' weight='medium'
                    >
                        {props.title}
                    </Text>
                    <Text 
                        className={styles['card__info__text__subtitle']}
                        tag='p' view='p-16' color='secondary'
                    >
                        {props.subtitle}
                    </Text>
                </div>
                <div className={styles['card__info__slot']}>
                    {props.contentSlot &&
                        <Text 
                            className={styles['card__info__slot__content']} 
                            tag='div' view='p-18' weight='bold'
                        >
                            {props.contentSlot}
                        </Text>
                    }
                    {props.actionSlot}
                </div>
            </div>
        </div>
    )
};

export default Card;
