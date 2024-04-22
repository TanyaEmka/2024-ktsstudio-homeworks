import * as React from "react";
import { useEffect, useState } from "react";
import './Menu.scss';

import { useNavigate , useLocation } from "react-router-dom";

import Text from "components/Text";

const Menu: React.FC = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const [selectedUrl, setUrl] = useState(0);

    useEffect(() => {
        const urls = paths.map((path) => path.url);
        const index = urls.indexOf(location.pathname);
        
        setUrl((index === -1 ? 0 : index));
    });

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
            {paths.map((path, index) => {
                return (
                    <Text
                        key={path.name}
                        className={["menu-option", 
                                    "menu-option-" + (selectedUrl === index ? 'selected' : 'unselected')]
                                    .join(' ').trim()}
                        view='p-16'
                        tag='div'
                        onCLick={() => { setUrl(index); navigate(path.url); }}
                    >
                        {path.name}
                    </Text>
                )
            })}
        </div>
    )
}

export default Menu;