import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Web3 from 'web3';
class NavBar extends Component {
    render() { 
        return ( 
            <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                <Link to=""
                    className="navbar-brand col-sm-3 col-md-2 mr-0">
                    Juis MarketPlace
                </Link>
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                        <small className="text-white">
                            <span id="account">{ this.props.account  }</span>
                        </small>
                    </li>
                </ul>
            </nav>
         );
    }
}
 
export default NavBar;