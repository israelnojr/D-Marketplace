const Marketplace = artifacts.require('./Marketplace.sol');
require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Marketplace', ([deployer, seller, buyer]) => {
    let marketplace 
    before(async () =>{
        marketplace =  await Marketplace.deployed()
    })

    describe('deployment', async () => {
        it('deploys successfully', async () => {
            const address = await marketplace.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })
        it('has a name', async () => {
            const name = await marketplace.name()
            assert.equal(name, 'Juis Decentralized MarketPlace')
        })
    })

    describe('products',  async () => {
        let result, productCount

        before(async () => {
            result = await marketplace.createProduct(
            'Iphone X',
            'An Iphone X from Apple Inc. 32GB in good condition',
            web3.utils.toWei('1', 'Ether'),{from: seller})
            productCount = await marketplace.productCount()
        })
        // test if product is created with proper peremeters
        it('Create products', async () => {
            assert.equal(productCount, 1)
            const event = result.logs[0].args
            assert.equal(event.id.toNumber(), productCount.toNumber(), 'id is correct')
            assert.equal(event.name, 'Iphone X' , ' Name is correct')
            assert.equal(event.desc, 'An Iphone X from Apple Inc. 32GB in good condition', ' Description is correct')
            assert.equal(event.price, '1000000000000000000' , 'Price is correct')
            assert.equal(event.owner, seller, 'Owner is correct')
            assert.equal(event.purchased, false, 'Purchased is correct')

            // checking for failure: Product must have a name
           await await marketplace.createProduct('', web3.utils.toWei('1', 'Ether'), {from: seller}).should.be.rejected;
           // checking for failure: Product must have a Price
           await await marketplace.createProduct('Iphone X', 'An Iphone X from Apple Inc. 32GB in good condition', 0, {from: seller}).should.be.rejected;
           // checking for failure: Product must have a description
           await await marketplace.createProduct('Iphone X', '', web3.utils.toWei('1', 'Ether'), {from: seller}).should.be.rejected;
        })

        // check products are available 
        it('lists products', async () => {
            const product = await marketplace.products(productCount)
            assert.equal(product.id.toNumber(), productCount.toNumber(), 'id is correct')
            assert.equal(product.name, 'Iphone X' , ' Name is correct')
            assert.equal(product.desc, 'An Iphone X from Apple Inc. 32GB in good condition' , ' Description is correct')
            assert.equal(product.price, '1000000000000000000' , 'Price is correct')
            assert.equal(product.owner, seller, 'Owner is correct')
            assert.equal(product.purchased, false, 'Purchased is correct')
        })

        it('sells products', async () => {
            // Track seller balance 
            let oldSellerBalance 
            oldSellerBalance = await web3.eth.getBalance(seller)
            oldSellerBalance = new web3.utils.BN(oldSellerBalance)
            //buyer makes purchase
            result = await marketplace.purchaseProduct(productCount, {
                from: buyer,
                value: web3.utils.toWei('1', 'Ether')
            })

            // check logs
            const event = result.logs[0].args
            assert.equal(event.id.toNumber(), productCount.toNumber(), 'id is correct')
            assert.equal(event.name, 'Iphone X' , ' Name is correct')
            assert.equal(event.desc, 'An Iphone X from Apple Inc. 32GB in good condition' , ' Description is correct')
            assert.equal(event.price, '1000000000000000000' , 'Price is correct')
            assert.equal(event.owner, buyer, 'Owner is correct')
            assert.equal(event.purchased, true, 'Purchased is correct')

            // // check seller recieved fund
            let newSellerBalance 
            newSellerBalance = await web3.eth.getBalance(seller)
            newSellerBalance = new web3.utils.BN(newSellerBalance)

            let price
            price = web3.utils.toWei('1', 'Ether')
            price = new web3.utils.BN(price)
            // set the expected balance for seller
            const expectedBal = oldSellerBalance.add(price)
            // if seller new and expected balace is equal
            assert.equal(newSellerBalance.toString(), expectedBal.toString())
            
            //check for failures :
            
            //buy none exist product
            await marketplace.purchaseProduct(99, {from: buyer, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;
            // buy product with insufficient balance
            await marketplace.purchaseProduct(productCount, {from: buyer, value: web3.utils.toWei('0.01', 'Ether')}).should.be.rejected;
            // fail if deployer tries to buy
            await marketplace.purchaseProduct(productCount, {from: deployer, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;
            // buyer can't buy twice
            await marketplace.purchaseProduct(productCount, {from: buyer, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;
        })

    })
})