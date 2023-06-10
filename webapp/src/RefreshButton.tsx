import React, { useState } from 'react';

interface Params {
    onClick: () => void
}
const RefreshButton = ({onClick}: Params) => {
    const [rotating, setRotating] = useState(false);

    const handleClick = () => {
        setRotating(true);
        setTimeout(() => {
            setRotating(false);
        }, 500);
        onClick()
    };

    return (
        <button
            className={`refresh-button ${rotating ? 'rotate' : ''}`}
            onClick={handleClick}
        >
            <img className={"refresh-icon"} alt={"refresh-icon"} src={"refresh-svgrepo-com.svg"}/>
        </button>
    );
};

export default RefreshButton;