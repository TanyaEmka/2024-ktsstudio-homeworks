import * as React from "react";

import Content from "./components/Content";
import Preview from "./components/Preview";
import styles from './Recipes.module.scss';

const Recipes: React.FC = () => {

    return (
        <div className={styles.recipes}>
            <Preview />
            <Content />
        </div>
    )
}

export default Recipes;