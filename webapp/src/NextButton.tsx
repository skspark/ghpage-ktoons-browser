import React, { useState } from 'react';

const ICON_SRC = process.env.PUBLIC_URL + '/next-svgrepo-com.svg'

interface Params {
    onClick: () => void
}

const RefreshButton = ({onClick}: Params) => {
    const [moving, setMoving] = useState(false);

    const handleClick = () => {
        setMoving(true);
        setTimeout(() => {
            setMoving(false);
        }, 100);
        onClick()
    };

    return (
        <button
            className={`next-button ${moving ? 'move' : ''}`}
            onClick={handleClick}
        >
            <img className={"next-icon"} alt={"next-icon"} src={ICON_SRC}/>
        </button>
    );
};

export default RefreshButton;