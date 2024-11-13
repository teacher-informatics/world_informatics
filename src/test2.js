const questions = [
    {
        question:" Скінчена послідовність указівок на виконання дій, спрямованих на розв’язування задач",
        answers:[
            { text: "Алгоритм", correct: true },
            { text: "Схема", correct: false },
            { text: "Документ", correct: false },
        ]
    },
    {
        question:"Вибрати приклад алгоритму.",
        answers:[
            { text: "Урок математики", correct: false },
            { text: "Карта метро", correct: false },
            { text: "Рецепт приготування страви", correct: true },
        ]
    },
    {
        question:"Виконавцем алгоритму може бути...",
        answers:[
            { text: "Рослина", correct: false },
            { text: "Будівля", correct: false },
            { text: "Людина", correct: true },
        ]
    },
    {
        question:"Виконавець алгоритмів, якому доступні всі команди Scratch — це ...",
        answers:[
            { text: "Команда", correct: false },
            { text: "Спрайт", correct: true },
            { text: "Сцена", correct: false },
        ]
    },
    {
        question:"Основного спрайта в Scratch звати...",
        answers:[
            { text: "Чорний Кіт", correct: false },
            { text: "Рудий Кіт", correct: true },
            { text: "Жовтий Кіт", correct: false },

        ]
    },
    {
        question:"Для спрайтів можна складати програми, використовуючи команди із ...",
        answers:[
            { text: "Різних блоків", correct: true },
            { text: "Одного блоку", correct: false },
            { text: "Двох блоків", correct: false },
        ]
    },
    {
        question:"Для виконання команд  потрібно натиснути на  кнопку...",
        answers:[
            { text: "Червоний квадрат", correct: false },
            { text: "Зелений квадрат", correct: false },
            { text: "Зелений прапорець", correct: true },
        ]
    },
    {
        question:"Місце, де відбуваються запрограмовані події в Scratch....",
        answers:[
            { text: "Майданчик", correct: false },
            { text: "Галявина", correct: false },
            { text: "Сцена", correct: true },
        ]
    },
    {
        question:"Який розділ у програмному середовищі Scratch може забезпечити пересування персонажів по сцені?",
        answers:[
            { text: "Рух", correct: true },
            { text: "Датчики", correct: false },
            { text: "Керувати", correct: false },
        ]
    },
    {
        question:"Який розділ у програмному середовищі Scratch може забезпечити зміну образів спрайту?",
        answers:[
            { text: "Рух", correct: false },
            { text: "Вигляд", correct: true },
            { text: "Оператори", correct: false },
        ]
    },
    {
        question:"Алгоритм, у якому всі команди виконуються послідовно ...",
        answers:[
            { text: "Лінійний", correct: true },
            { text: "Послідовний", correct: false },
            { text: "Циклічний", correct: false },
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