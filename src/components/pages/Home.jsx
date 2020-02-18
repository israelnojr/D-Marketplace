import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import logo from '../../logo.png';
class Home extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="content mr-auto ml-auto">
                <Link to="/">
                    <img src={logo} className="App-logo" alt="logo" />
                </Link>
                <h1>Home Page</h1>
                <Link to="/marketplace"
                    className="App-link">
                    Goto MarketPlace
                </Link>
            </div>
         );
    }
}
 
export default Home;