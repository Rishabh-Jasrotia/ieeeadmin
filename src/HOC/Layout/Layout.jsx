import React from "react";
import './Layout.css';

import Header from '../../Components/Header/Header';

const Layout = (props) => {
    return (
        <div className="Layout">
            <Header />
            <div className="main">
                {props.children}
            </div>
        </div>
    );
}

export default Layout;