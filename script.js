const questions = [
    {
        question: "What is the full form of HTML?",
        answers: [
            { text: "Hyper Text Multi Language", correct: false },
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Hyper Text Machine Language", correct: false },
            { text: "Hyper Transfer Markup Language", correct: false }
        ]        
    },
    {
        question: "What does the a tag in HTML represent?",
        answers: [
            { text: "Anchor(Link)", correct: true },
            { text: "Audio", correct: false },
            { text: "Image", correct: false },
            { text: "Advertisement", correct: false }
        ]        
    },
    
    {
        question: "Which CSS property controls the text size?",
        answers: [
            { text: "text-size", correct: false },
            { text: "font-size", correct: true },
            { text: "font-family", correct: false },
            { text: "text-style", correct: false }
        ]        
    },

    {
        question: "Which of the following is used to create a space between the content and the border of an element?",
        answers: [
            { text: "margin", correct: false },
            { text: "padding", correct: true },
            { text: "border-spacing", correct: false },
            { text: "spacing", correct: false }
        ]        
    },
   
    {
        question: "Which CSS property is used to change the background color of an element?",
        answers: [
            { text: "color", correct: false },            
            { text: "bg-color", correct: false },
            { text: "background-image", correct: false },
            { text: "background-color", correct: true },
        ]        
    },   
   
   
];

const questionElement = document.getElementById("Question");
const ansbtn = document.getElementById("ansbtn");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        ansbtn.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none"; // Hide next button initially
    while (ansbtn.firstChild) {
        ansbtn.removeChild(ansbtn.firstChild); // Clear previous answer buttons
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(ansbtn.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true; // Disable all buttons after an answer is selected
    });

    nextButton.style.display = "block"; // Show next button after answer
}

function handleNextBtn() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(); // Show next question
    } else {
        showScore(); // Show score if no more questions
    }
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;

    nextButton.innerHTML = "Play Again"; // Text for the button after the quiz ends
    nextButton.style.display = "block"; // Show the button
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextBtn(); // Move to the next question
    } else {
        startQuiz(); // Restart the quiz
    }
});

startQuiz();
