import React from 'react';

import './LoadingBar.css';

const LoadingBar = (props) => {
    return(
        <div className="loader">
            <div className="bar" 
                style={{'background': `${props.background}`, 'backgroundColor':`${props.backgroundColor}`}}>
            </div>
        </div> 
    )
}

export default LoadingBar;