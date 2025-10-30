const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Madrid", correct: false },
      { text: "Paris", correct: true },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  //   {
  //     question: "Who painted the Mona Lisa?",
  //     answers: [
  //       { text: "Vincent van Gogh", correct: false },
  //       { text: "Leonardo da Vinci", correct: true },
  //       { text: "Pablo Picasso", correct: false },
  //       { text: "Michelangelo", correct: false },
  //     ],
  //   },
  //   {
  //     question: "What is the smallest country in the world?",
  //     answers: [
  //       { text: "Monaco", correct: false },
  //       { text: "San Marino", correct: false },
  //       { text: "Vatican City", correct: true },
  //       { text: "Liechtenstein", correct: false },
  //     ],
  //   },
  //   {
  //     question: "Which element has the chemical symbol 'O'?",
  //     answers: [
  //       { text: "Gold", correct: false },
  //       { text: "Oxygen", correct: true },
  //       { text: "Silver", correct: false },
  //       { text: "Osmium", correct: false },
  //     ],
  //   },
  //   {
  //     question: "In which year did World War II end?",
  //     answers: [
  //       { text: "1943", correct: false },
  //       { text: "1944", correct: false },
  //       { text: "1945", correct: true },
  //       { text: "1946", correct: false },
  //     ],
  //   },
  //   {
  //     question: "What is the tallest mountain in the world?",
  //     answers: [
  //       { text: "K2", correct: false },
  //       { text: "Kangchenjunga", correct: false },
  //       { text: "Mount Everest", correct: true },
  //       { text: "Lhotse", correct: false },
  //     ],
  //   },
  //   {
  //     question:
  //       "Which programming language is known as the 'language of the web'?",
  //     answers: [
  //       { text: "Python", correct: false },
  //       { text: "Java", correct: false },
  //       { text: "JavaScript", correct: true },
  //       { text: "C++", correct: false },
  //     ],
  //   },
  //   {
  //     question: "How many continents are there on Earth?",
  //     answers: [
  //       { text: "5", correct: false },
  //       { text: "6", correct: false },
  //       { text: "7", correct: true },
  //       { text: "8", correct: false },
  //     ],
  //   },
];

const startScreen = document.getElementById("start-screen");
const testScreen = document.getElementById("test-screen");
const totalQuestion = document.getElementById("total-questions");
const startButton = document.getElementById("start-buttton");
const restartButton = document.getElementById("restart-button");
const scoreKeeper = document.getElementById("scoreKeeper");
const questionTitle = document.getElementById("question-title");
const currentQuestion = document.getElementById("current-question");
const progressPercentage = document.getElementById("progress-percentage");
const answercontainer = document.getElementById("answer-conatiner");
const resultScreen = document.getElementById("result-screen");
const ttotalQuestion = document.getElementById("ttotal-questions");
const sscoreKeeper = document.getElementById("sscoreKeeper");
const review = document.getElementById("review");

// vars
let currenQuestionIndex = 0;
let score = 0;
let buttonDisabled = false;

totalQuestion.textContent = questions.length;
scoreKeeper.textContent = 0;

//event listeners

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  console.log(questions.length);
  // rest everything
  currenQuestionIndex = 0;
  scoreKeeper.textContent = 0;

  startScreen.classList.remove("active");
  testScreen.classList.add("active");

  showQuestions();
}

function showQuestions() {
  //resetting

  const currentAnsweringQuestion = questions[currenQuestionIndex];
  currentQuestion.textContent = currenQuestionIndex + 1;
  buttonDisabled = false;

  questionTitle.textContent = currentAnsweringQuestion.question;
  progressPercentage.style.width =
    (currenQuestionIndex / questions.length) * 100 + "%";

  questionTitle.textContent = questions[currenQuestionIndex].question;

  answercontainer.innerHTML = "";
  currentAnsweringQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("options");
    button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answercontainer.appendChild(button); // adding button to the ui
  });
}

function selectAnswer(event) {
  console.log("indied");
  if (buttonDisabled) return;

  buttonDisabled = true;

  let correct = event?.target?.dataset?.correct === "true";
  Array.from(answercontainer.children).forEach((button) => {
    // TODO know why we are using Array.from
    if (button.dataset.correct === "true") {
      console.log(button.dataset.correct);
      button.classList.add("correct-answer");
    } else if (button.dataset.correct === "false") {
      button.classList.add("incorrect-answer");
    }
  });

  if (correct) {
    score++;
    scoreKeeper.textContent = score;
  }
  setTimeout(() => {
    currenQuestionIndex++;

    if (currenQuestionIndex < questions.length) {
      showQuestions();
    } else {
      showResult();
    }
  }, 1000);
}
function showResult() {
  testScreen.classList.remove("active");
  resultScreen.classList.add("active");

  sscoreKeeper.textContent = score;
  ttotalQuestion.textContent = questions.length;

  let message = "";
  if (score == 0 || score == 1) {
    message = "try again ";
  } else if (score > 3 || score < 6) {
    message = "You can do better";
  } else if (score > 6 || score < 9) {
    message = "almost but you  do *better";
  } else if (score > 9) {
    message = "You have done Great job";
  }

  review.textContent = message;
}
function restartQuiz() {
  console.log("asdasd");
  currenQuestionIndex = 0;
  score = 0;
  resultScreen.classList.remove("active");
  startScreen.classList.add("active");
}
