const net = require('net');
const port = 8124;
const startConnect = 'QA';
const serverOK = 'ACK';
let questions = [];
let currentQuestionIndex = 0;
const qaPath = "D://qa.json";
const client = new net.Socket();
const fs = require('fs');

client.setEncoding('utf8');


client.connect(port, function() {
  console.log('Connected');
  client.write(startConnect);

});



client.on('data', function(data) {
  console.log(data);

if (data === serverOK)
{
   fs.readFile(qaPath, function (err, data) {
        if (err) 
        {
            console.log(err);
        }
        else 
        {
           questions = JSON.parse(data);
            mixQuestion();
            client.write(serverOK);
            
         for (let i = 0 ; i < questions.length; i ++)
              {
                console.log(questions[i].question);
                console.log(questions[i].true);
                console.log(questions[i].false);
              }
      
        }
    });
}

else
{
  client.destroy();
}
});



client.on('close', function() {
  console.log('Connection closed');
});


function mixQuestion() {
    let counter = questions.length;

    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);

        counter--;

        let temp = questions[counter];
        questions[counter] = questions[index];
        questions[index] = temp;
    }
}