import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import logo from '../../logo.png';
import Web3 from 'web3';
class MarketPlace extends Component {
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
            <div className="content mr-auto ml-auto">
                <Link to="/">
                    <img src={logo} className="App-logo" alt="logo" />
                </Link>
                <h1>MarketPlace</h1>
                <Link to="/"
                    className="App-link">
                    Return to Home Page
                </Link>

                <p>{  this.state.account  }</p>
            </div>
         );
    }
}
 
export default MarketPlace;