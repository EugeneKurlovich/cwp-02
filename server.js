const net = require('net');
const fs = require('fs');
const port = 8124;
const serverOK = 'ACK';
const serverNO = 'DEC';
const startConnect = 'QA';
const qaPath = "E://PSCP//lr3//qa.json";
const logFile = "E://PSCP//lr3//logs";
let questions = [];
let seed = 0;

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
              
 fs.writeFile(client.id+`.txt`,`Client ${client.id} is connect\r\n`,(err)=>{if(err) console.log('Error');});


        
                 
                console.log(client.id + "  connected");
                    client.write(serverOK);
          

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


            fs.appendFile(client.id + '.txt','Q: ' + questionObj.question + '\n', function(error)
                    {
                    
                if(error) throw error; 
                 
            
                    });

     fs.appendFile(client.id+ '.txt','A: ' + serverAnswer+ '\n', function(error)
                    {
                    
                if(error) throw error; 
                 
             
                    });



                client.write(serverAnswer);
            }
        }
        else
         {
            console.log(err);
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