/// Trying to recreate functionality from tweeter.

// This will append the api/showQuiz holding the api of our quiz_questions
// Needed to create a new page that will render out api for this to work. 
// Look at the code inside showQuiz.js or visit /api/showQuiz in the browser for more info.
// basically i use this to grab the api created from our database table.
$(() => {
  $.ajax({
    method: "GET",
    url: "/api/showQuiz"
  }).done(({
    quiz_questions
  }) => {
    console.log(quiz_questions)
    for (user of quiz_questions) {
      //$("<div>").text(user.question).appendTo($("div#tweets-container"));
      const html = `
      <div id="quiz-box">
        <h2 id="question">${user.question}</h2>
        <div class="choice-container">
          <p class="choice-prefix">A</p>
          <p class="choice-text" data-number="1">${user.answer1}</p>
        </div>
        <div class="choice-container">
          <p class="choice-prefix">B</p>
          <p class="choice-text" data-number="2">${user.answer2}</p>
        </div>
        <div class="choice-container">
          <p class="choice-prefix">C</p>
          <p class="choice-text" data-number="3">${user.answer3}</p>
        </div>
        <div class="choice-container">
          <p class="choice-prefix">D</p>
          <p class="choice-text" data-number="4">${user.answer4}</p>
        </div>
      </div>
    `;
      let $questionBox = $(html).prependTo($("div#question-container"));

    }
  });
});
