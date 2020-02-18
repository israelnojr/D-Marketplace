import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Web3 from 'web3';
class NavBar extends Component {
    async componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
    }
    async loadWeb3() {
        if(window.ethereum){
          window.web3 = new Web3(window.ethereum)
          await window.ethereum.enable()
        }
        else if(window.web3){
            window.web3 = new Web3(window.web3.currentProvider)
        }
        else{
            window.alert('No Ethereum supported browder detected... Consider installing metamask')
        }
      }
      async loadBlockchainData() {
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts()
        this.setState({account: accounts[0]})
      }

      constructor(props) {
        super(props)
        this.state = {
            account: ''
        }
      }
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
                            <span id="account">{  this.state.account  }</span>
                        </small>
                    </li>
                </ul>
            </nav>
         );
    }
}
 
export default NavBar;