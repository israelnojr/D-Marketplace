pragma solidity ^0.5.0;

contract Marketplace {
    string public name;
    uint public productCount = 0;
    mapping(uint => Product) public products;

    struct Product {
        uint id;
        string name;
        string desc;
        uint price;
        address payable owner;
        bool purchased;
    }

    event ProductCreated(
        uint id,
        string name,
        string desc,
        uint price,
        address payable owner,
        bool purchased
    );

    event ProductPurchased(
        uint id,
        string name,
        string desc,
        uint price,
        address payable owner,
        bool purchased
    );

    constructor() public{
        name = "Juis Decentralized MarketPlace";
    }

    function createProduct(string memory _name, string memory _desc, uint _price) public {
        //Validate
        require(bytes(_name).length > 0);
        require(bytes(_desc).length > 10);
        require(_price > 0);

        //increment product count
        productCount++;

        //create new product
        products[productCount] = Product(
            productCount,
            _name,
            _desc,
            _price,
            msg.sender,
            false
        );

        //trigger event
        emit ProductCreated(
            productCount,
            _name,
            _desc,
            _price,
            msg.sender,
            false
        );
    }

    function purchaseProduct(uint _id) public payable {
        // fetch product
        Product memory _product = products[_id];
        // fetch owner
        address payable _seller = _product.owner;
        // make sure product_id is valid
        require(_product.id > 0 && _product.id <= productCount);
        // check if buyer has enough eth
        require(msg.value >= _product.price);
        // check if product is not already purchased
        require(!_product.purchased);
        //check that seller is not buyer
        require(_seller != msg.sender);
        // purchase it
        _product.owner = msg.sender; 
        // mark as purchased
        _product.purchased = true;
        //update product
        products[_id] = _product;
        //pay seller
        address(_seller).transfer(msg.value);
        //trigger event
        emit ProductPurchased(
            productCount,
            _product.name,
            _product.desc,
            _product.price,
            msg.sender,
            true
        );
    }
}