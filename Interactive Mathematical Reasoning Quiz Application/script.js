document.addEventListener('DOMContentLoaded', function() {
    // Quiz questions and answers
    const quizData = [
        {
            question: "What is the next number in the sequence: 2, 4, 8, 16, 32, ___?",
            options: ["48", "64", "52", "72"],
            correct: 1  // 0-indexed, so 1 refers to "64"
        },
        {
            question: "If x + 3 = 7, what is the value of x?",
            options: ["3", "5", "10", "4"],
            correct: 3  // 0-indexed, so 3 refers to "4"
        },
        {
            question: "If the perimeter of a square is 20 cm, what is the length of one side?",
            options: ["10 cm", "5 cm", "4 cm", "8 cm"],
            correct: 1  // 0-indexed, so 1 refers to "5 cm"
        },
        {
            question: "A bag contains 5 red balls and 3 blue balls. What is the probability of randomly picking a red ball?",
            options: ["2/1", "5/8", "8/3", "3/2"],
            correct: 1  // 0-indexed, so 1 refers to "5/8"
        },
        {
            question: "John is twice as old as Mary. If John is 24 years old, how old will Mary be in 5 years?",
            options: ["12", "17", "29", "14"],
            correct: 1  // 0-indexed, so 1 refers to "17"
        },
        {
            question: "The length of a rectangle is 8 cm, and its width is 5 cm. What is its area?",
            options: ["13 cm²", "40 cm²", "18 cm²", "24 cm²"],
            correct: 1  // 0-indexed, so 1 refers to "40 cm²"
        },
        {
            question: "A train travels 300 km in 5 hours. What is its average speed?",
            options: ["50 km/h", "60 km/h", "70 km/h", "80 km/h"],
            correct: 1  // 0-indexed, so 1 refers to "60 km/h"
        },
        {
            question: "What is the smallest prime number greater than 20?",
            options: ["21", "23", "25", "27"],
            correct: 1  // 0-indexed, so 1 refers to "23"
        },
        {
            question: "What is the sum of the angles in a triangle?",
            options: ["90°", "180°", "270°", "360°"],
            correct: 1  // 0-indexed, so 1 refers to "180°"
        },
        {
            question: "What is the next number in the sequence: 1, 1, 2, 3, 5, 8, ...?",
            options: ["10", "11", "13", "15"],
            correct: 2  // 0-indexed, so 2 refers to "13"
        }
    ];
    
    const quizContainer = document.getElementById('quiz-container');
    const resultContainer = document.getElementById('result-container');
    const submitBtn = document.getElementById('submit-btn');
    const restartBtn = document.getElementById('restart-btn');
    const scoreValue = document.getElementById('score-value');
    const answersReview = document.getElementById('answers-review');
    const progressBar = document.getElementById('progress');
    
    // Initialize quiz
    function initQuiz() {
        // Reset previous quiz state
        quizContainer.innerHTML = '';
        resultContainer.style.display = 'none';
        progressBar.style.width = '0%';
        
        // Generate quiz questions
        quizData.forEach((questionData, index) => {
            const questionContainer = document.createElement('div');
            questionContainer.classList.add('question-container');
            questionContainer.id = `question-${index}`;
            
            const questionElement = document.createElement('div');
            questionElement.classList.add('question');
            questionElement.textContent = `${index + 1}. ${questionData.question}`;
            
            const optionsContainer = document.createElement('div');
            optionsContainer.classList.add('options');
            
            questionData.options.forEach((option, optionIndex) => {
                const optionElement = document.createElement('div');
                optionElement.classList.add('option');
                
                const radioInput = document.createElement('input');
                radioInput.type = 'radio';
                radioInput.name = `question-${index}`;
                radioInput.id = `question-${index}-option-${optionIndex}`;
                radioInput.value = optionIndex;
                
                const label = document.createElement('label');
                label.htmlFor = `question-${index}-option-${optionIndex}`;
                label.textContent = option;
                
                optionElement.appendChild(radioInput);
                optionElement.appendChild(label);
                
                // Add click event to the whole option div
                optionElement.addEventListener('click', function() {
                    radioInput.checked = true;
                    updateProgressBar();
                });
                
                optionsContainer.appendChild(optionElement);
            });
            
            questionContainer.appendChild(questionElement);
            questionContainer.appendChild(optionsContainer);
            quizContainer.appendChild(questionContainer);
        });
    }
    
    // Update progress bar based on answered questions
    function updateProgressBar() {
        const totalQuestions = quizData.length;
        let answeredQuestions = 0;
        
        for (let i = 0; i < totalQuestions; i++) {
            const radioButtons = document.querySelectorAll(`input[name="question-${i}"]:checked`);
            if (radioButtons.length > 0) {
                answeredQuestions++;
            }
        }
        
        const progressPercentage = (answeredQuestions / totalQuestions) * 100;
        progressBar.style.width = `${progressPercentage}%`;
    }
    
    // Submit quiz and show results
    function submitQuiz() {
        const userAnswers = [];
        
        // Collect user answers
        quizData.forEach((_, index) => {
            const selectedOption = document.querySelector(`input[name="question-${index}"]:checked`);
            userAnswers.push(selectedOption ? parseInt(selectedOption.value) : -1);
        });
        
        // Check if all questions are answered
        if (userAnswers.includes(-1)) {
            alert('Please answer all questions before submitting.');
            return;
        }
        
        // Calculate score
        let score = 0;
        userAnswers.forEach((answer, index) => {
            if (answer === quizData[index].correct) {
                score++;
            }
        });
        
        // Display score
        scoreValue.textContent = score;
        
        // Generate answers review
        answersReview.innerHTML = '';
        userAnswers.forEach((answer, index) => {
            const reviewItem = document.createElement('div');
            reviewItem.classList.add('review-item');
            reviewItem.classList.add(answer === quizData[index].correct ? 'correct' : 'incorrect');
            
            const reviewQuestion = document.createElement('div');
            reviewQuestion.classList.add('review-question');
            reviewQuestion.textContent = `${index + 1}. ${quizData[index].question}`;
            
            const userAnswerElement = document.createElement('div');
            userAnswerElement.classList.add('user-answer');
            if (answer === -1) {
                userAnswerElement.textContent = 'Your answer: Not answered';
            } else {
                userAnswerElement.textContent = `Your answer: ${quizData[index].options[answer]}`;
            }
            
            const correctAnswerElement = document.createElement('div');
            correctAnswerElement.classList.add('correct-answer');
            correctAnswerElement.textContent = `Correct answer: ${quizData[index].options[quizData[index].correct]}`;
            
            reviewItem.appendChild(reviewQuestion);
            reviewItem.appendChild(userAnswerElement);
            reviewItem.appendChild(correctAnswerElement);
            
            answersReview.appendChild(reviewItem);
        });
        
        // Show results
        quizContainer.style.display = 'none';
        submitBtn.style.display = 'none';
        resultContainer.style.display = 'block';
    }
    
    // Restart quiz
    function restartQuiz() {
        quizContainer.style.display = 'block';
        submitBtn.style.display = 'inline-block';
        initQuiz();
    }
    
    // Event listeners
    submitBtn.addEventListener('click', submitQuiz);
    restartBtn.addEventListener('click', restartQuiz);
    
    // Initialize quiz on page load
    initQuiz();
});