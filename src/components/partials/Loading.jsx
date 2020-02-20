import React, { Component } from 'react';
import Spin from '../../components/img/Spin.gif'
class Splash extends Component {
    render() { 
        return ( 
            <div className="content mr-auto ml-auto mb-auto text-center" style={{width: '100vw', marginTop:'10%'}}>
            <div className="container">
                <div className="row">
                    <div className="col col-10" style={{margin: ['0', 'auto'], position: 'relative', top: '170px', left: '100px'}}>
                       <img src={Spin} alt=""/>
                    </div>
                </div>
            </div>
        </div>
         );
    }
}
 
export default Splash;