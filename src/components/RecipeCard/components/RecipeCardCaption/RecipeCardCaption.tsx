import * as React from "react";
import TimeIcon from "components/icons/TimeIcon";
import styles from './RecipeCardCaption.module.scss';

interface RecipeCardCaptionProps {
    readyInMinutes: number
}

const RecipeCardCaption: React.FC<RecipeCardCaptionProps> = ({
    readyInMinutes
}) => {

    return (
        <span className={styles["recipe-card-caption"]}>
            <TimeIcon />
            <span>{readyInMinutes} minutes</span>
        </span>
    )
}

export default RecipeCardCaption;