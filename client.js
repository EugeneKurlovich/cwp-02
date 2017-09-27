const net = require('net');
const port = 8124;
const startConnect = 'QA';

const client = new net.Socket();

client.setEncoding('utf8');


client.connect(port, function() {
  console.log('Connected');
  client.write(startConnect);
});



client.on('data', function(data) {
  console.log(data);
  client.destroy();
});



client.on('close', function() {
  console.log('Connection closed');
});