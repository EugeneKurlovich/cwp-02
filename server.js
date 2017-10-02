const net = require('net');
const fs = require('fs');
const port = 8124;
const serverOK = 'ACK';
const serverNO = 'DEC';
const startConnect = 'QA';
const qaPath = "D://qa.json";
const clientLogPathDefault = './logs'
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






    function AskQuestions(data, err) {
        if (!err) {
            if (data !== startConnect) {
                let questionObj = getQuestionObj(data);
                let serverAnswer = questionObj[(Math.random() < 0.5) ? "true" : "false"].toString();

               // clientLogWrite('Q: ' + questionObj.question);
               // clientLogWrite('A: ' + serverAnswer);

                client.write(serverAnswer);
            }
        }
        else
         {
           // clientLogWrite(err);
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