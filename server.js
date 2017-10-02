const net = require('net');
const fs = require('fs');
const port = 8124;
const serverOK = 'ACK';
const serverNO = 'DEC';
const startConnect = 'QA';
const qaPath = "D://qa.json";
const logFile = "E://PSCP//lr3//logs";
let questions = [];
let seed = 0;
let fdFile;

const server = net.createServer((client) => {
  

  client.setEncoding('utf8');

client.on('data',UserDialog);
client.on('data',AskQuestions);
   

 function UserDialog(data, err) 
    {
        if (!err)
         {
            if (data === startConnect) 
            {
                    client.id = getUniqId();
                fs.open(`${logFile}//client_${client.id}.txt`, 'w', function (err, fd) {
                    fdFile = fd;
                    clientLogWrite("Client id: " + client.id + " connected");
                    clientLogWrite(" Start logging");                  
                console.log(client.id + "  connected");
                    client.write(serverOK);
                });

            }
        }
         else 
         {
            client.write(serverNO);
            client.write(err);
        }
    }






    function AskQuestions(data, err) {
        if (!err) {
            if (data !== startConnect) {
                let questionObj = getQuestionObj(data);
                let serverAnswer = questionObj[(Math.random() < 0.5) ? "true" : "false"].toString();

                clientLogWrite('Q: ' + questionObj.question);
                clientLogWrite('A: ' + serverAnswer);

                client.write(serverAnswer);
            }
        }
        else
         {
            clientLogWrite(err);
        }
    }


function getQuestionObj(question) {
    for (let i = 0; i < questions.length; i++) {
        if (questions[i].question === question) {
            return questions[i];
        }
    }
}


function getUniqId() 
{
    return seed++;
}


  });


function clientLogWrite(data) {
    fs.write(fdFile, data + '\r\n', function (err) {
        if (err) {
            console.log(err);
        }
    });
}
 


server.listen(port, () => {
  console.log("Server listening on localhost: " + port);

  fs.readFile(qaPath, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            questions = JSON.parse(data);
        }
    });

});