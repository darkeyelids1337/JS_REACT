import React from "react";
import './app-header.css';
const AppHeader =() => {
    return (
        <div className="header-wrap">
            <div className="header-title">
                <h1>Админка фильмотеки</h1>
            </div>
            <div className="header-credits">
                <p>by Kamyzin Artem</p>
            </div>
        </div>
    )
}
export default AppHeader;