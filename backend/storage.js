const redis = require('redis');

const client = redis.createClient({
  host: process.env.REDIS_HOST || 'localhost'
});

client.on('error', (error) => {
  console.error('REDIS ERROR!');
  console.error(error);
});

module.exports = {
  client
};
