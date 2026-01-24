const {Redis} = require('ioredis');

const client = new Redis();

async function init(){
    console.log("in client ",await client.get("otp:user@gmail.com"));
}

// init();
//

module.exports = client;