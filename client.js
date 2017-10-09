const net = require('net');
const port = 8124;
const startConnect = 'QA';
const serverOK = 'ACK';
let questions = [];
const serverNO = 'DEC';
let currentQuestionIndex = 0;
const qaPath = "E://PSCP//lr3//qa.json";
const client = new net.Socket();
const fs = require('fs');
let ind = 0;
client.setEncoding('utf8');


client.connect(port, function() {

    fs.readFile(qaPath, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            questions = JSON.parse(data);
            mixQuestion();
           console.log('Connected');
  client.write(startConnect);
        }
    });
});



client.on('data', function(data) {
    if (data === serverOK) 
    {
        client.write(questions[ind].question);

    }
    else if (data === serverNO) 
    {
        console.log(data);
        client.destroy();

    }
    else if (data !== serverOK) {
        console.log("\nQuestion: " + questions[ind].question);
        console.log("Server answer: " + data);
        console.log(data === questions[ind].true.toString() ?
            "Server answer is true" :
            "True answer: " + questions[ind].true);
        if (++ind !== questions.length) {
            client.write(questions[ind].question)
        }
        else {
            client.destroy();
        }
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