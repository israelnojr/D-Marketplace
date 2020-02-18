import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import NavBar from './partials/Navbar';
import MarketPlace from './pages/Marketplace';
import Home from './pages/Home';
import Error from './pages/Error';

  function App() {
    return (
      <>
        <NavBar />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
            <Switch>
            <Route exact path="/" component={Home} />
              <Route exact path="/marketplace" component={MarketPlace} />
              <Route component={Error} />
            </Switch>
            </main>
            </div>
          </div>  
      </>
    );
  }

export default App;
