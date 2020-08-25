/// Trying to recreate functionality from tweeter.

/* function createTweetElement(questionObj) {
  let $tweetBox = $("<div>").addClass("question-container");
  const html = `
      <div id="game" class="justify-center flex-column">
        <h2 id="quesiton">What is the answer to this questions?</h2>
        <div class="choice-container">
          <p class="choice-prefix">A</p>
          <p class="choice-text">${questionObj.questionID.answer1}</p>
        </div>
        <div class="choice-container">
          <p class="choice-prefix">B</p>
          <p class="choice-text">${questionObj.questionID.answer2}</p>
        </div>
        <div class="choice-container">
          <p class="choice-prefix">C</p>
          <p class="choice-text">${questionObj.questionID.answer3}</p>
        </div>
        <div class="choice-container">
          <p class="choice-prefix">D</p>
          <p class="choice-text">${questionObj.questionID.answer4}</p>
        </div>
      </div>
    `;
  $tweetBox = $tweetBox.append(html);
  return $tweetBox;
};

function renderTweets(tweets) {
  let $html = $('<div></div>');
  tweets.forEach((tweet) => {
    let newtweet = createTweetElement(tweet);
    $html.prepend(newtweet);
  })
  $("#tweets-container").html($html);
}

function loadTweets() {
  $.ajax({
    url: '/createQuiz',
    method: 'GET',
    dataType: "json",
    success: function (data) {
      console.log('Success: ', data);
      renderTweets(data);
    }
  });

} */
