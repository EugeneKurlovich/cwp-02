const net = require('net');
const port = 8124;
let seed = 0;
const serverOK = 'ACK';
const serverNO = 'DEC';
const startConnect = 'QA';

const server = net.createServer((client) => {
  

  client.setEncoding('utf8');

client.on('data',UserDialog);
   

    function UserDialog(data, err) 
    {
        if (!err)
         {
            if (data === startConnect) 
            {
                client.id = getUniqId();
                client.write(serverOK);
                console.log(client.id + "  connected");
            }
        }
         else 
         {
            client.write(serverNO);
            client.write(err);

        }
    }

  });



 



server.listen(port, () => {
  console.log("Server listening on localhost: " + port);
});


function getUniqId() 
{
    return seed++;
}