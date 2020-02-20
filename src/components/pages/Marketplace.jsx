import React, { Component } from 'react';
import * as app from '../App';
class MarketPlace extends Component {
   
render() { 
    return ( 
        <div className="content mr-auto ml-auto mb-auto" style={{width: '100vw', marginTop:'10%'}}>
            <div className="container" style={{marginBottom: '70px'}}>
                <div className="row">
                    <div className=" col col-12 ">
                        <div className="row">
                            <div className="col col-1"></div>
                            <div className="col col-10">
                                
                                <div className="card">
                                    <div className="card-header">
                                    <h2>Add Product</h2>
                                    </div>
                                    <div className="card-body">
                                    <form className="no-margin" onSubmit={(event) => {
                                        event.preventDefault()
                                        const name = this.productName.value
                                        const desc = this.productDesc.value
                                        const ipfsHash = this.productImage.value
                                        console.log(ipfsHash)
                                        const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
                                        this.props.createProduct(name, desc, ipfsHash, price)
                                    }} >
                                    <fieldset>
                                        <div className="form-group mr-sm-2">
                                            <div className="input-group">
                                                <input id="name" type="text" className="form-control input-lg input-transparent"
                                                    placeholder="Product Name" required ref={(input) => {this.productName = input}}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group mr-sm-2">
                                            <div className="input-group">
                                                <textarea id="desc" type="text" className="form-control input-lg input-transparent"
                                                    placeholder="Product Description" ref={(input) => {this.productDesc = input}}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group mr-sm-2">
                                            <div className="input-group">
                                                <input id="price" type="text" className="form-control input-lg input-transparent"
                                                    placeholder="Product Price" required ref={(input) => {this.productPrice = input}}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group mr-sm-2">
                                            <div className="input-group">
                                                <input id="price" type="file" className="form-control input-lg input-transparent"
                                                    placeholder="Product Image" required ref={(input) => {this.productImage = input}}
                                                />
                                            </div>
                                        </div>
                                    </fieldset>
                                    <div className="form-actions">
                                        <button type="submit" className="btn btn-lg btn-danger">
                                            <small>Add Product</small>
                                        </button>
                                    </div>
                                </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col col-1"></div>
                        </div>
                        <div className="line" style={{marginTop: '25px', height: '1px', background: 'rgba(141, 140, 140, 0.38)'}}></div>
                
                       <div className="card">
                           <div className="card-header">
                            <h2>Buy Product</h2>
                           </div>
                           <div className="card-body">
                           <table className="table table-striped table-responsive">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Desctiption</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Owner</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody id="productList">
                                   {this.props.products.map((product, key) =>{
                                       return(
                                        <tr key={key} style={ this.props.account == product.owner ? {display: 'none'} : {display: ''} }>
                                            <td>{product.name}</td>
                                            <td>{product.desc}</td>
                                            <td>{window.web3.utils.fromWei(product.price.toString(), 'ether')} ETH</td>
                                            <td>{product.owner}</td>
                                            <td>
                                                {
                                                <button disabled={ this.props.account == product.owner ? true : false }
                                                    name = {product.id}
                                                    value = {product.price}
                                                    onClick={(event) => {
                                                        this.props.purchaseProduct(event.target.name, event.target.value)
                                                    }}
                                                    className="buyButton"> Buy Me
                                                </button>
                                                }
                                            </td>
                                        </tr>
                                       )
                                   })}
                                </tbody>
                            </table>
                           </div>
                       </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}
 
export default MarketPlace;