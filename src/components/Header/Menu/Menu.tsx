import React from "react";
import './Menu.scss';

import Text from "components/Text";
import { useNavigate } from "react-router-dom";

const Menu: React.FC = () => {

    const navigate = useNavigate();

    const paths = [
        {
            name: 'Recipes',
            url: '/recipes',
        },
        {
            name: 'Ingradients',
            url: '/ingradients',
        },
        {
            name: 'Products',
            url: '/products',
        },
        {
            name: 'Menu Items',
            url: '/items',
        },
        {
            name: 'Meal planning',
            url: '/planning',
        },
    ];

    return (
        <div className="menu">
            {paths.map((path) => {
                return (
                    <Text
                        className="menu-option"
                        view='p-16'
                        tag='div'
                        onCLick={() => { navigate(path.url) }}
                    >
                        {path.name}
                    </Text>
                )
            })}
        </div>
    )
}

export default Menu;