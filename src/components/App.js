import React, { Component } from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import NavBar from './partials/Navbar';
import Splash from './partials/Loading';
import MarketPlace from './pages/Marketplace';
import Home from './pages/Home';
import Error from './pages/Error';
import Web3 from 'web3';
import Marketplace from '../abis/Marketplace.json';
// import ipfs from '../ipfs-config';
class App extends Component {
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
        const networkId = await web3.eth.net.getId()
        const networkData = Marketplace.networks[networkId]
        if(networkData) {
          const marketplace = web3.eth.Contract(Marketplace.abi, networkData.address)
          this.setState({marketplace})
          const productCount = await marketplace.methods.productCount().call()
          this.setState({productCount})
          for( var i = 1; i <= productCount; i++){
            const product = await marketplace.methods.products(i).call()
            this.setState({
              products: [...this.state.products, product]
            })
          }
          this.setState({loading: false})

        }
        else {
           window.alert('Contract is not deployed to this network') 
        }
      }

      constructor(props) {
        super(props)
        this.state = {
            account: '',
            productCount: 0,
            products: [],
            loading: true
        }
        this.createProduct = this.createProduct.bind(this)
        this.purchaseProduct = this.purchaseProduct.bind(this)
      }

      createProduct(name,desc,ipfsHash,price){
        this.setState({loading: true})
        this.state.marketplace.methods.createProduct(name, desc, ipfsHash, price).send({from: this.state.account})
        .once('receipt',(receipt)=>{
          this.setState({loading: false})
          this.state.window.location.reload();         
        })
      }

      purchaseProduct(id, price){
        this.setState({loading: true})
        this.state.marketplace.methods.purchaseProduct(id).send({from: this.state.account, value: price})
        .once('receipt',(receipt)=>{
          this.setState({loading: false})
          this.state.window.location.reload();         
        })
      }
    render() { 
        return ( 
          <>
            <NavBar account={  this.state.account  } />
            <main role="main" className="mb-9">
            {/* <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/marketplace" component={MarketPlace} />
              <Route component={Error} />
            </Switch> */}
              {this.state.loading ? <Splash /> :  
              <MarketPlace
                account={  this.state.account  }
                createProduct={this.createProduct}
                purchaseProduct={this.purchaseProduct}
                products={this.state.products}
              />}
            </main>
          </>
        );
    }
}
 
export default App;
