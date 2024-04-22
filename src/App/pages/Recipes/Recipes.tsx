import * as React from "react";
import './Recipes.scss';

import Content from "./components/Content";
import Preview from "./components/Preview";

const Recipes: React.FC = () => {

    return (
        <div className="recipes">
            <Preview />
            <Content />
        </div>
    )
}

export default Recipes;