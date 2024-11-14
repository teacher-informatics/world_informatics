const questions = [
    {
        question:"Яблуко,квітка,метелик. ",
        answers:[
            { text: "Яблуко, квітка, метелик", correct: true },
            { text: "Яблуко ,квітка ,метелик", correct: false },
            { text: "Яблуко , квітка , метелик", correct: false },
        ]
    },
    {
        question:"Книжка ,зошит ,школа.",
        answers:[
            { text: "Книжка,зошит,школа.", correct: false },
            { text: "Книжка-зошит-школа.", correct: false },
            { text: "Книжка, зошит, школа.", correct: true },
        ]
    },
    {
        question:"(  3+5  )+2=10",
        answers:[
            { text: "( 3+5 )+2=10", correct: false },
            { text: "(3+5+2=10", correct: false },
            { text: "(3+5)+2=10", correct: true },
        ]
    },
    {
        question:"Париж-столиця Франції.",
        answers:[
            { text: "Париж  столиця Франції.", correct: false },
            { text: "Париж – столиця Франції.", correct: true },
            { text: "Париж, столиця Франції.", correct: false },
        ]
    }, 
    {
        question:"Далеко - далеко, близько - близько.",
        answers:[
            { text: "Далеко далеко, близько - близько.", correct: false },
            { text: "Далеко-далеко, близько-близько.", correct: true },
            { text: "Далеко - далеко, близько- близько.", correct: false },

        ]
    },
    {
        question:"Визначні місця Києва : Золоті Ворота, Хрещатик.",
        answers:[
            { text: "Визначні місця Києва: Золоті Ворота, Хрещатик.", correct: true },
            { text: "Визначні місця Києва:Золоті Ворота, Хрещатик.", correct: false },
            { text: "Визначні місця Києва :Золоті Ворота, Хрещатик.", correct: false },
        ]
    },
    {
        question:"Пори року:зима,весна,літо,осінь.",
        answers:[
            { text: "Пори року:зима ,весна ,літо ,осінь.", correct: false },
            { text: "Пори року : зима,весна,літо,осінь.", correct: false },
            { text: "Пори року: зима, весна, літо, осінь.", correct: true },
        ]
    },
    {
        question:"Яскраво - червоний,яскраво - зелений.",
        answers:[
            { text: "Яскраво червоний,яскраво зелений.", correct: false },
            { text: "Яскраво,червоний, яскраво,зелений.", correct: false },
            { text: "Яскраво-червоний, яскраво-зелений.", correct: true },
        ]
    },
    {
        question:"Лондон-це   столиця   Великобританії.",
        answers:[
            { text: "Лондон – це столиця Великобританії.", correct: true },
            { text: "Лондон-це столиця Великобританії.", correct: false },
            { text: "Лондон- це   столиця   Великобританії.", correct: false },
        ]
    },
    {
        question:"О с і н ь, в е с н а",
        answers:[
            { text: "О с і нь, весна", correct: false },
            { text: "Осінь, весна", correct: true },
            { text: "Осінь, в е с н а", correct: false },
        ]
    },
    {
        question:"2* (1+3)=8",
        answers:[
            { text: "2*(1+3)=8", correct: true },
            { text: "2 * (1+3)=8", correct: false },
            { text: "2(1+3)=8", correct: false },
        ]
    }
]


let questionElement = document.getElementById('question');
let answerButton = document.querySelector('.answers');
let nextButton = document.getElementById('next_btn'); 

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Наступне запитання';
    showQuestion();
}


function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.
    question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButton.appendChild(button);
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}


function resetState(){
    nextButton.style.display = 'none';
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(event){
    const selectedBtn = event.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if(isCorrect){
        selectedBtn.classList.add('correct');
        score++;
    } else {
        selectedBtn.classList.add('incorrect');
    }
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === 'true'){
            button.classList.add('correct');
        } 
        button.disabled = true;
    });
    
    nextButton.style.display = 'block'

}

function showScore(){
    resetState();
    questionElement.innerHTML = `Кількість правильних відповідей ${score} з ${questions.length}!`;
    nextButton.innerHTML = 'Пройти тест з початку';
    nextButton.style.display = 'block';
}



function handleNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length){
        showQuestion(); 
    } else {
        showScore();
    }
}


nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else {
        startQuiz();
    }
})

startQuiz();