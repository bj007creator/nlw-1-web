import React, { useState } from 'react';
import './style.css';

interface HeaderProps {
    title : string;
}

const Header : React.FC<HeaderProps> = (props) => {
    const [title, setTitle] = useState(props.title);
    return (
        <header className="sidebar">
            <nav>
                <ul>
                    <li>{title}</li>
                    <li>{title}</li>
                    <li>{title}</li>
                    <li>{title}</li>
                    <li>{title}</li>
                </ul>
            </nav>
        </header>
    );
}
export default Header;