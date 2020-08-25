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
    for (user of quiz_questions) {
      //$("<div>").text(user.question).appendTo($("div#tweets-container"));
      const html = `
      <div id="game">
        <h2 id="question">${user.question}</h2>
        <div class="choice-container">
          <p class="choice-prefix">A</p>
          <p class="choice-text">${user.answer1}</p>
        </div>
        <div class="choice-container">
          <p class="choice-prefix">B</p>
          <p class="choice-text">${user.answer2}</p>
        </div>
        <div class="choice-container">
          <p class="choice-prefix">C</p>
          <p class="choice-text">${user.answer3}</p>
        </div>
        <div class="choice-container">
          <p class="choice-prefix">D</p>
          <p class="choice-text">${user.answer4}</p>
        </div>
      </div>
    `;
      let $questionBox = $(html).prependTo($("div#question-container"));

    }
  });
});
