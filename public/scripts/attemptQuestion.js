console.log('HELLO');

$(document).ready(() => {
    $('.quizName').click((event)=>{
        console.log('this is the click handler', event.target.value);
        console.log('This is closest', $(this).closest(".quiz-result"));
    })
})