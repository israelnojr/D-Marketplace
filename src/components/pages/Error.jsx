import React, { Component } from 'react';
import logo from '../../logo.png';
import {Link} from 'react-router-dom';
class Error extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="content mr-auto ml-auto">
                <Link to="/">
                    <img src={logo} className="App-logo" alt="logo" />
                </Link>
                <h1>Error 404 Page not found</h1>
                <Link to="/"
                    className="App-link">
                    Return to Home Page
                </Link>
            </div>
        );
    }
}
 
export default Error;