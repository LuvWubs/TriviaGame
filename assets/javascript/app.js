$(document).ready(function() {

  var correctGuess = 0;
  var badGuess = 0;
  var userGuess = false;

  var Question = function(config) {
    this.question = config.question;
    this.choices = config.choices;
    this.answer = config.answer;
  }

  var quest1;
  var quest2;
  var quest3;
  var quest4;
  var quest5;

  quest1 = {
    question: 'What is a sign of a stroke111111?',
    choices: ['Sudden confusion', 'Itchy Armpits', 'Pain while walking'],
    answer: 'Sudden confusion'
  }

  quest2 = {
    question: 'What is a sign of a stroke2222222?',
    choices: ['Shortness of breath', 'Sudden vision trouble', 'Sudden fatigue'],
    answer: 'Sudden vision trouble'
  }

  quest3 = {
    question: 'What is a sign of a stroke333333?',
    choices: ['Sudden pain on one side of body', 'Chest pain', 'Sudden weakness on one side of body'],
    answer: 'Sudden weakness on one side of body'
  }

  quest4 = {
    question: 'What is a sign of a stroke444444?',
    choices: ['Sudden panic or fear', 'Sudden ringing in your ears', 'Sudden dizziness or loss of balance'],
    answer: 'Sudden dizziness or loss of balance'
  }

  quest5 = {
    question: 'What is a sign of a stroke555555?',
    choices: ['Sudden severe headache', 'Tongue thickening', 'Flushed skin'],
    answer: 'Sudden severe headache'
  }

  var oneQuestion = new Question(quest1);
  var twoQuestion = new Question(quest2);
  var threeQuestion = new Question(quest3);
  var fourQuestion = new Question(quest4);
  var fiveQuestion = new Question(quest5);
  var question = [oneQuestion, twoQuestion, threeQuestion, fourQuestion, fiveQuestion];

  var state = {
    count: 0,
    end: question.length
  };

  $('#gameStart').click(function() {
    $('#instructions').empty();
    $('#gameStart').hide();
    displayQ(state);
    displayChoices(state);
  })

  // NB: need to stop gameTimer upon userGuess
  function gameTimer() {
    var timesUp = 5;
    var timer = setInterval(function() {
      $('#timer').text(timesUp);
      timesUp--;
      if (timesUp < 0) {
        $('#timer').text('Loading next question...');
        endTime(timer);
      }
      // NB: need functionality for end of game timeIsUp function
      if (state.count === question.length) {
        timeIsUp();
      }
      if (userGuess === true) {
        endTime(timer);
      }
    }, 1000);
  }

  function endTime(timer) {
    clearInterval(timer);
  }

  function handleAnswer() {
    var answer = $('input[type=radio]:checked').val();
    console.log('answer', answer);
      if (answer === question[state.count].answer) {
        $('#Aspot').text('Great job! You are correct!')
      } else if (answer !== undefined) {
        $('#Aspot').text('Incorrect! The correct answer is ' + question[state.count].answer)
      } else {
        $('#Aspot').text('The correct answer is ' + question[state.count].answer)
      }
  }

  function timeIsUp() {
    setInterval(function () {
      console.log('has this beeen caled????');
      $('#Qspot').text('');
      $('#Aspot').text('');
      $('#timer').text('Time has run out!')
      winMssg();
    }, 2000);
  }

  function winMssg() {
    if (correctGuess > badGuess) {
      $('#Aspot').text('Good job, you could save a life one day!');
    } else {
      $('#Aspot').text('Keep studying stroke symptoms, you could save a life one day!');
    }
  }

  function displayQ(state) {
    userGuess = false;
    $('#Qspot').text(question[state.count].question);
    $('#Aspot').text('');
    var timer = gameTimer();
    setTimeout(function() {
      state.count++;
      displayChoices();

      if (state.count === state.end) {
        endTime(timer);
        return;
      }
      displayQ(state);
    }, 10000)
  }

  function displayChoices() {
    $('#choices').empty();
    var options = question[state.count].choices;
    for (i = 0; i < options.length; i++) {
      var selection = $('<p>');
      selection.text(' ' + options[i], '<br>')
      var $rButton = $(`<input type="radio" name="question-${i}" value="${options[i]}" />`);
      $rButton.prependTo(selection);
      $('#choices').append(selection);
    }
    // NB: need event handler for lack of user guess
    $(document).on('click', '#choices', function() {
      userGuess = true;
      console.log('userGuess: ', userGuess);
      endTime(timer);
      handleAnswer();
      displayQ();
    })
  }
})
