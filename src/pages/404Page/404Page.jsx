import React from 'react';
import { useNavigate } from 'react-router-dom';
import './404Page.scss';


const NotFoundPage = () => {
    const navigate = useNavigate();

    const handleHomeRedirect = () => {
        navigate('/');
    };

    return (
        <div className="page-not-found" >
            <div className="noise"></div>
            <div className="overlay"></div>
            <div className="terminal">
                <h1>Error <span className="errorcode">404</span></h1>
                <p className="output">The page you are looking for might have been removed, had its name changed or is temporarily unavailable.</p>
                <p className="output">Please try to <a style={{ "color": "green" }} href="/" onClick={handleHomeRedirect}>return to the homepage</a>.</p>
                <p className="output">Good luck.</p>
            </div>
        </div>
    );
};

export default NotFoundPage;
