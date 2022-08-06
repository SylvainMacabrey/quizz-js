function Question(title, answers, correct) {

    this.title = title;
    this.answers = answers;
    this.correct = correct;

    this.getElement= function() {
        let questionTitle = document.createElement("h2");
        questionTitle.textContent = `Question ${ quiz.currentQuestion+1 }/${ quiz.questions.length }`;
        questionTitle.classList.add('quiz-subtitle');
        questionscreen.appendChild(questionTitle);
        let questionSubtitle = document.createElement("h3");
        questionSubtitle.textContent = this.title;
        questionSubtitle.classList.add('quiz-subtitle');
        questionscreen.appendChild(questionSubtitle);
        let answersElement = document.createElement("ul");
        answersElement.classList.add('answers');
        this.answers.forEach((answer, index) => {
            let answerElement = document.createElement("li");
            answerElement.classList.add('answer');
            answerElement.textContent = answer;
            answerElement.id = index;
            answersElement.appendChild(answerElement);
            answerElement.addEventListener('click', this.checkAnswer)
        });
        questionscreen.appendChild(answersElement);
    };

    this.checkAnswer = (event) => {
        let answerSelected = event.target;
        if(answerSelected.id == this.correct) {
            answerSelected.classList.add("answer-correct");
            quiz.note += 1;
            console.log(quiz.note);
        } else {
            answerSelected.classList.add("answer-wrong");
            let correctAnswer = document.getElementById(this.correct);
            correctAnswer.classList.add("answer-correct");
        }
        setTimeout(() => {
            questionscreen.textContent = "";
            quiz.currentQuestion += 1;
            quiz.showCurrentQuestion();
        }, 1000);
    }

}

function Quiz() {

    this.questions = [];
    this.note = 0;
    this.currentQuestion = 0;

    this.addQuestion = function() {
        for (const argument of arguments) {
            this.questions.push(argument);
        }
    }

    this.showCurrentQuestion = function() {
        if(this.currentQuestion < this.questions.length) {
            this.questions[this.currentQuestion].getElement();
        } else {
            questionscreen.style.display = "none";
            resultscreen.style.display = "block";
            spanNbCorrects.textContent = quiz.note;
        }
    }
}

let quiz = new Quiz();

let question1 = new Question("Quel est la capital de l'Australie ?", ["Sydney", "Canberra", "Melbourne"], 1);
let question2 = new Question("Quel Est la capital Des États Unis", ["New York", "Los Angeles", "Washington"], 2);
let question3 = new Question("Qui est l'actuel président des États Unies ?", ["Barack Obama", "Joe Biden", "Donald Trump"], 1);
let question4 = new Question("Qui n'a jamais été président de la république française ?", ["Jean Luc Melanchon", "Nicolas Sarkozi", "Emmanuel Macron"], 0);

quiz.addQuestion(question1, question2, question3, question4);

let spanNbCorrects = document.getElementById('nbcorrects');
let spanNbQuestions = document.getElementsByClassName('nbquestions');
let welcomeButton = document.getElementById('welcome-btn');
let screenWelcome = document.getElementById('welcomescreen');
let questionscreen = document.getElementById('questionscreen');
let resultscreen = document.getElementById('resultscreen');

spanNbQuestions[0].textContent = quiz.questions.length;

let seeFirstQuestion = () => {
    screenWelcome.style.display = "none";
    questionscreen.style.display = "block";
    quiz.showCurrentQuestion();
}

welcomeButton.addEventListener('click', seeFirstQuestion);

spanNbQuestions[1].textContent = quiz.questions.length;


