const questions = [
    {
        question:"Комп'ютерна програма,яка призначена для створення та редагування текстових файлів.",
        answers:[
            { text: "Текстовий редактор", correct: true },
            { text: "Комп'ютерна презентація", correct: false },
            { text: "Електронні таблиці", correct: false },
        ]
    },
    {
        question:"Виправлення помилок, видалення, переміщення, копіювання, вставляння символів, слів, рядків, абзаців.",
        answers:[
            { text: "Форматування тексту", correct: false },
            { text: "Редагування тексту", correct: true },
            { text: "Друк тексту", correct: false },
        ]
    },
    {
        question:"Виконувати дії з фрагментом тексту можна лише після його ...",
        answers:[
            { text: "форматування", correct: false },
            { text: "виділення", correct: true },
            { text: "видалення", correct: false },
        ]
    },
    {
        question:"Для копіювання фрагменів тексту використовуються клавіші ...",
        answers:[
            { text: "Ctrl+M", correct: false },
            { text: "Shift+C", correct: false },
            { text: "Ctrl+V", correct: true },
        ]
    },
    {
        question:"Для вирізання фрагменів тексту використовуються клавіші ...",
        answers:[
            { text: "Ctrl+R", correct: false },
            { text: "Shift+X", correct: false },
            { text: "Ctrl+X", correct: true },
        ]
    },
    {
        question:"Зміна зовнішнього вигляду тексту - це ... ",
        answers:[
            { text: "форматування  тексту", correct: true },
            { text: "виділення тексту", correct: false },
            { text: "редагування тексту", correct: false },
        ]
    },
    {
        question:"Під час форматування тексту можна змінювати ... ",
        answers:[
            { text: "шрифт тексту", correct: false },
            { text: "колір і накреслення тексту", correct: false },
            { text: "шрифт, розмір, колір, накреслення тексту", correct: true },
        ]
    },
    {
        question:"До форматування абзаців відноситься зміна... ",
        answers:[
            { text: "інтервалів між літерами, відступів", correct: false },
            { text: "вирівнювання", correct: false },
            { text: "міжрядкових інтервалів, вирівнювання, відступів", correct: true },
        ]
    },
    {
        question:"Види списків у текстовому редакторі. ",
        answers:[
            { text: "нумерований, маркірований, багаторівневий", correct: true },
            { text: "символьний, багаторівневий", correct: false },
            { text: "цифровий, маркірований", correct: false },
        ]
    },
    {
        question:"Таблиця у текстовому редакторі складається із ...  ",
        answers:[
            { text: "рядків", correct: false },
            { text: "рядків і стовпчиків", correct: true },
            { text: "стовпчиків", correct: false },
        ]
    },
    {
        question:"Чи можна розміщувати графічні зображення у текстовому документі? ",
        answers:[
            { text: "так", correct:true },
            { text: "ні", correct: false },
        ]
    },
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