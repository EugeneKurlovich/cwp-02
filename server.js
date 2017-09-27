const net = require('net');
const port = 8124;
const serverOK = 'ACK';
const serverNO = 'DEC';
const startConnect = 'QA';
const qaPath = "./qa.json";
const clientLogPathDefault = './logs'
let questions = [];
let seed = 0;
let fdFile;

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
            client.on('end', () => console.log('Client disconnected'));
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