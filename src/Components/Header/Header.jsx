import React from "react";
import './Header.css';

import LoadingBar from '../LoadingBar/LoadingBar';

import { connect } from "react-redux";

const Header = (props) => {
    return(
        <div className="Header">
            {props.loading ? <LoadingBar backgroundColor="#4169E1"/> : null}
            <div className="Header_content">
                <img src="ieee.png" />
                <h3>ADMIN</h3>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        loading: state.data.loading,
    }
}

export default connect(mapStateToProps)(Header);