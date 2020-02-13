const Marketplace = artifacts.require('./Marketplace.sol');

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
            result = await marketplace.createProduct('Iphone X', web3.utils.toWei('1', 'Ether'),{from: seller})
            productCount = await marketplace.productCount()
        })
        it('Create products', async () => {
            assert.equal(productCount, 1)
            const event = result.logs[0].args
            assert.equal(event.id.toNumber(), productCount.toNumber(), 'id is correct')
            assert.equal(event.name, 'Iphone X' , ' Name is correct')
            assert.equal(event.price, '1000000000000000000' , 'Price is correct')
            assert.equal(event.owner, seller, 'Owner is correct')
            assert.equal(event.purchased, false, 'Purchased is correct')
        })
    })
})