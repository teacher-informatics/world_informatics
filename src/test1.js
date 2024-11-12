const questions = [
    {
        question:"Що таке персональний комп'ютер?",
        answers:[
            { text: "Пристрій для запису музики", correct: false },
            { text: "Пристрій для виконання обчислень і роботи з інформацією", correct: true },
            { text: "Пристрій для перегляду фільмів", correct: false },
        ]
    },
    {
        question:"Який  з пристроїв належить до пристроїв введення даних?",
        answers:[
            { text: "Принтер", correct: false },
            { text: "Монітор", correct: false },
            { text: "Клавіатура", correct: true },
        ]
    },
    {
        question:"Який  з пристроїв належить до пристроїв введення даних?",
        answers:[
            { text: "Принтер", correct: false },
            { text: "Навушники", correct: false },
            { text: "Сканер", correct: true },
        ]
    },
    {
        question:"Який із пристроїв належить до пристроїв виведення даних?",
        answers:[
            { text: "Мишка", correct: false },
            { text: "Монітор", correct: true },
            { text: "Клавіатура", correct: false },
        ]
    },
    {
        question:"Пристрій, який допоможе тобі написати лист другові.",
        answers:[
            { text: "Мікрофон", correct: false },
            { text: "Клавіатура", correct: true },
            { text: "Сканер", correct: false },

        ]
    },
    {
        question:"Пристрій, за допомогою якого можна роздрукувати фотографії.",
        answers:[
            { text: "Принтер", correct: true },
            { text: "Процесор", correct: false },
            { text: "Клавіатура", correct: false },
        ]
    },
    {
        question:"Пристрій, який допоможе тобі намалювати малюнок.",
        answers:[
            { text: "Сканер", correct: false },
            { text: "Курсор", correct: false },
            { text: "Мишка", correct: true },
        ]
    },
    {
        question:"Комп’ютер, який встановлений у певному приміщенні та постійно підключений до електромережі.",
        answers:[
            { text: "Ноутбук", correct: false },
            { text: "Планшет", correct: false },
            { text: "Стаціонарний комп'ютер", correct: true },
        ]
    },
    {
        question:"Комп’ютер, який можна взяти у подорож.",
        answers:[
            { text: "Ноутбук", correct: true },
            { text: "Планшет", correct: false },
            { text: "Стаціонарний комп'ютер", correct: false },
        ]
    },
    {
        question:"Пристрій для зберігання даних.",
        answers:[
            { text: "Процесор", correct: false },
            { text: "Флеш карта", correct: true },
            { text: "Материнська плата", correct: false },
        ]
    },
    {
        question:"Пристрій для обробки даних.",
        answers:[
            { text: "Процесор", correct: true },
            { text: "Накопичувач", correct: false },
            { text: "Материнська плата", correct: false },
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
    nextButton.innerHTML = 'Next question';
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
    questionElement.innerHTML = `Your scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = 'Play again';
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