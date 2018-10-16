socket.on('loaded', function() { // we wait until the client has loaded and contacted us that it is ready to go.

    socket.emit('answer', "Hey there! We're going to play a trivia game together. We'll start with an easy one."); //We start with the introduction;
    setTimeout(timedQuestion, 5000, socket, "What is your name?"); // Wait a moment and respond with a question.

  });
  socket.on('message', (data) => { // If we get a new message from the client we process it;
    console.log(data);
    questionNum = bot(data, socket, questionNum); // run the bot function with the new message
  });
  socket.on('disconnect', function() { // This function  gets called when the browser window gets closed
    console.log('user disconnected');
  });
});
//--------------------------CHAT BOT FUNCTION-------------------------------//
function bot(data, socket, questionNum) {
  var input = data; // This is generally really terrible from a security point of view ToDo avoid code injection
  var answer;
  var question;
  var waitTime;

  /// These are the main statments that make up the conversation.
  if (questionNum == 0) {
    answer = 'Hello ' + input + '! Let\'s start!'; // output response
    waitTime = 5000;
    question = 'What is the capital of Spain?'; // load next question
  } else if (questionNum == 1) {
    if (input.toLowerCase() === 'madrid'){
    answer = 'This is correct! Madrid is the capital.';} // output response
    else {
    answer = 'Actually, it\'s Madrid.';}
    waitTime = 5000;
    question = 'How much is 2 in the power of 10??'; // load next question
  } else if (questionNum == 2) {
    if (parseInt(input) === 1024){
    answer = 'Correctomudo!';}
    else{
    answer = 'As a matter of fact, it\'s 1024.';}
    waitTime = 5000;
    question = 'In what year was the airplace invented?'; // load next question
  } else if (questionNum == 3) {
    if (parseInt(input) === 1903) {
    answer = 'And that is corect! 1903!';}
    else {
    answer = 'Well, in reality it was 1903.';}
    socket.emit('changeBG', input.toLowerCase());
    waitTime = 5000;
    question = 'Would you like to make a small change?'; // load next question
  } else if (questionNum == 4) {
    if (input.toLowerCase() === 'yes' || input === 1) {
      answer = 'Perfect!';
      waitTime = 5000;
      question = 'Whats your favorite place?';
    } else if (input.toLowerCase() === 'no' || input === 0) {
      socket.emit('changeFont', 'white'); /// we really should look up the inverse of what we said befor.
      answer = ''
      question = 'How about now?';
      waitTime = 0;