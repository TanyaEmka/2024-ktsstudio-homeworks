import React from "react";
import './Recipes.scss';

import Preview from "./components/Preview";
import Content from "./components/Content";

const Recipes: React.FC = () => {

    return (
        <div className="recipes">
            <Preview />
            <Content />
        </div>
    )
}

export default Recipes;