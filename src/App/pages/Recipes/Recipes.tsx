import * as React from "react";
import styles from './Recipes.module.scss';

import Content from "./components/Content";
import Preview from "./components/Preview";

const Recipes: React.FC = () => {

    return (
        <div className={styles.recipes}>
            <Preview />
            <Content />
        </div>
    )
}

export default Recipes;