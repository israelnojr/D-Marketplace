const IPFS = require(ipfs-api);
const ipfs = new IPFS({ 
    host: 'ipfs.infura.io', 
    port: 5001, 
    protocol: 'https://mainnet.infura.io/v3/87ff07b8fa0148e988c90f7504552878'
})

export default ipfs;