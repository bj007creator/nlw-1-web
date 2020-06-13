import React, { useState } from 'react'

interface ItemProps {
    image_url : string,
    title : string,
    id : number
}

const Item : React.FC<ItemProps> = (props) => {
    const { image_url, title } = props;
    const [itemState, setItemState] = useState("overlayer");

    function handleSelectItem () {
        setItemState(   itemState === 'overlayer' ?
                        'overlayer selected' :
                        'overlayer' );
    }
    return (
        <li>
            <img src={image_url} alt="test"/>
            <span>{title}</span>
            <div className={itemState} onClick={handleSelectItem}></div>
        </li>
    );
}