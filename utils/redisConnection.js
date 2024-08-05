const { createClient } = require('redis');


let client =  createClient()
const redisConnect = async () => await client.on('error', err => console.log('Redis Client Error', err)).connect();

redisConnect().catch((e => {
    console.log('redis error:  ', e)
}));

module.exports = client