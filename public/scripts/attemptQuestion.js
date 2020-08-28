console.log('HELLO');
const answers = {};


$(document).ready(() => {
    $('.quizName').click((event) => {
        const question = event.target.parentElement.parentElement.parentElement.dataset;
        answers[question.number] = { ...question, answer: event.target.value }
    })

    $('#submission').on('submit', evt => {
        evt.preventDefault();
        console.log("Reality is often dissapointing...");
        const result = { quizId: answers[0].quizid, ownerId: answers[0].ownerid };
        let score = 0;
        Object.values(answers).forEach(answer => {
            if (answer.answer === answer.correctanswer) {
                score++;
            }
        });
        result.score = score;
        console.log(result);
        $.post(`/attemptQuiz/${result.quizId}`, result).then(resp => {
            console.log("FUCK YE")
            console.log(resp);
            window.location.href = window.location.origin + '/results/' + resp.resultId;
        })
    })
})
