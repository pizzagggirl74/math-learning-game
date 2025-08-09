class MathLearningGame {
    constructor() {
        this.currentQuestion = null;
        this.score = 0;
        this.streak = 0;
        this.questionsAnswered = 0;
        this.correctAnswers = 0;
        this.totalQuestions = 10;
        this.startTime = null;
        this.timerInterval = null;
        this.gameActive = false;
        
        this.difficultyRanges = {
            easy: { min: 1, max: 10 },
            medium: { min: 1, max: 50 },
            hard: { min: 1, max: 100 }
        };
        
        this.operations = {
            addition: { symbol: '+', func: (a, b) => a + b },
            subtraction: { symbol: '-', func: (a, b) => a - b },
            multiplication: { symbol: '×', func: (a, b) => a * b },
            division: { symbol: '÷', func: (a, b) => a / b }
        };
        
        this.initializeElements();
        this.bindEvents();
    }
    
    initializeElements() {
        // Get all DOM elements
        this.elements = {
            difficulty: document.getElementById('difficulty'),
            operation: document.getElementById('operation'),
            playerName: document.getElementById('player-name'),
            startGame: document.getElementById('start-game'),
            gameArea: document.getElementById('game-area'),
            settingsPanel: document.querySelector('.settings-panel'),
            question: document.getElementById('question'),
            answerInput: document.getElementById('answer-input'),
            submitAnswer: document.getElementById('submit-answer'),
            feedback: document.getElementById('feedback'),
            score: document.getElementById('score'),
            streak: document.getElementById('streak'),
            questionsAnswered: document.getElementById('questions-answered'),
            totalQuestions: document.getElementById('total-questions'),
            correctAnswers: document.getElementById('correct-answers'),
            timer: document.getElementById('timer'),
            progress: document.getElementById('progress'),
            gameComplete: document.getElementById('game-complete'),
            finalScore: document.getElementById('final-score'),
            accuracy: document.getElementById('accuracy'),
            totalTime: document.getElementById('total-time'),
            performanceMessage: document.getElementById('performance-message'),
            playAgain: document.getElementById('play-again')
        };
    }
    
    bindEvents() {
        this.elements.startGame.addEventListener('click', () => this.startGame());
        this.elements.submitAnswer.addEventListener('click', () => this.submitAnswer());
        this.elements.playAgain.addEventListener('click', () => this.resetGame());
        
        // Allow Enter key to submit answer
        this.elements.answerInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.submitAnswer();
            }
        });
        
        // Auto-focus input when game starts
        this.elements.answerInput.addEventListener('focus', () => {
            this.elements.answerInput.select();
        });
    }
    
    startGame() {
        this.gameActive = true;
        this.score = 0;
        this.streak = 0;
        this.questionsAnswered = 0;
        this.correctAnswers = 0;
        this.startTime = Date.now();
        
        this.elements.settingsPanel.style.display = 'none';
        this.elements.gameArea.style.display = 'block';
        this.elements.gameComplete.style.display = 'none';
        
        this.elements.totalQuestions.textContent = this.totalQuestions;
        
        this.updateDisplay();
        this.generateQuestion();
        this.startTimer();
        
        // Focus on input
        setTimeout(() => {
            this.elements.answerInput.focus();
        }, 100);
    }
    
    generateQuestion() {
        if (!this.gameActive) return;
        
        const difficulty = this.elements.difficulty.value;
        const operation = this.elements.operation.value;
        const range = this.difficultyRanges[difficulty];
        
        let selectedOperation;
        if (operation === 'mixed') {
            const ops = Object.keys(this.operations);
            selectedOperation = ops[Math.floor(Math.random() * ops.length)];
        } else {
            selectedOperation = operation;
        }
        
        let num1 = this.randomInRange(range.min, range.max);
        let num2 = this.randomInRange(range.min, range.max);
        
        // Special handling for division to avoid decimals
        if (selectedOperation === 'division') {
            // Make sure num1 is divisible by num2
            num2 = this.randomInRange(1, Math.min(10, range.max));
            num1 = num2 * this.randomInRange(1, Math.floor(range.max / num2));
        }
        
        // Special handling for subtraction to avoid negative results
        if (selectedOperation === 'subtraction') {
            if (num2 > num1) {
                [num1, num2] = [num2, num1]; // Swap to ensure positive result
            }
        }
        
        const op = this.operations[selectedOperation];
        const answer = Math.round(op.func(num1, num2) * 100) / 100; // Round to avoid floating point issues
        
        this.currentQuestion = {
            num1,
            num2,
            operation: selectedOperation,
            symbol: op.symbol,
            answer
        };
        
        this.elements.question.textContent = `${num1} ${op.symbol} ${num2} = ?`;
        this.elements.answerInput.value = '';
        this.elements.feedback.textContent = '';
        this.elements.feedback.className = 'feedback';
    }
    
    submitAnswer() {
        if (!this.gameActive || !this.currentQuestion) return;
        
        const userAnswer = parseFloat(this.elements.answerInput.value);
        const correctAnswer = this.currentQuestion.answer;
        
        if (isNaN(userAnswer)) {
            this.showFeedback('Please enter a valid number!', false);
            return;
        }
        
        const isCorrect = Math.abs(userAnswer - correctAnswer) < 0.01; // Allow for small floating point differences
        
        this.questionsAnswered++;
        
        if (isCorrect) {
            this.correctAnswers++;
            this.streak++;
            this.score += this.calculatePoints();
            this.showFeedback(`Correct! Great job! 🎉`, true);
        } else {
            this.streak = 0;
            this.showFeedback(`Not quite. The answer is ${correctAnswer}. Keep trying! 💪`, false);
        }
        
        this.updateDisplay();
        
        if (this.questionsAnswered >= this.totalQuestions) {
            setTimeout(() => this.endGame(), 1500);
        } else {
            setTimeout(() => this.generateQuestion(), 1500);
        }
    }
    
    calculatePoints() {
        const difficulty = this.elements.difficulty.value;
        const basePoints = {
            easy: 10,
            medium: 15,
            hard: 20
        };
        
        const streakMultiplier = Math.min(1 + (this.streak - 1) * 0.1, 2); // Max 2x multiplier
        return Math.floor(basePoints[difficulty] * streakMultiplier);
    }
    
    showFeedback(message, isCorrect) {
        this.elements.feedback.textContent = message;
        this.elements.feedback.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
    }
    
    updateDisplay() {
        this.elements.score.textContent = this.score;
        this.elements.streak.textContent = this.streak;
        this.elements.questionsAnswered.textContent = this.questionsAnswered;
        this.elements.correctAnswers.textContent = this.correctAnswers;
        
        const progressPercent = (this.questionsAnswered / this.totalQuestions) * 100;
        this.elements.progress.style.width = `${progressPercent}%`;
    }
    
    startTimer() {
        this.timerInterval = setInterval(() => {
            if (!this.gameActive) return;
            
            const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            this.elements.timer.textContent = `${elapsed}s`;
        }, 1000);
    }
    
    endGame() {
        this.gameActive = false;
        clearInterval(this.timerInterval);
        
        const totalTime = Math.floor((Date.now() - this.startTime) / 1000);
        const accuracy = Math.round((this.correctAnswers / this.totalQuestions) * 100);
        
        this.elements.gameArea.style.display = 'none';
        this.elements.gameComplete.style.display = 'block';
        
        this.elements.finalScore.textContent = this.score;
        this.elements.accuracy.textContent = `${accuracy}%`;
        this.elements.totalTime.textContent = `${totalTime}s`;
        
        this.showPerformanceMessage(accuracy);
        
        // Automatically send email to dad
        this.sendEmailToDad(totalTime, accuracy);
    }
    
    showPerformanceMessage(accuracy) {
        const message = this.elements.performanceMessage;
        
        if (accuracy >= 90) {
            message.textContent = "🌟 Excellent! You're a math superstar! 🌟";
            message.className = "performance-message excellent";
        } else if (accuracy >= 70) {
            message.textContent = "👏 Good job! Keep practicing to improve! 👏";
            message.className = "performance-message good";
        } else {
            message.textContent = "📚 Keep practicing! You'll get better with time! 📚";
            message.className = "performance-message needs-practice";
        }
    }
    
    resetGame() {
        this.gameActive = false;
        clearInterval(this.timerInterval);
        
        this.elements.gameComplete.style.display = 'none';
        this.elements.gameArea.style.display = 'none';
        this.elements.settingsPanel.style.display = 'block';
        
        // Reset displays
        this.score = 0;
        this.streak = 0;
        this.updateDisplay();
    }
    
    async sendEmailToDad(totalTime, accuracy) {
        try {
            const playerName = this.elements.playerName.value.trim() || 'Your Child';
            
            const gameData = {
                playerName: playerName,
                score: this.score,
                accuracy: accuracy,
                totalTime: `${totalTime}s`,
                difficulty: this.elements.difficulty.value,
                operation: this.elements.operation.value,
                questionsAnswered: this.questionsAnswered,
                correctAnswers: this.correctAnswers
            };
            
            // Show a brief message that email is being sent
            const originalMessage = this.elements.performanceMessage.textContent;
            this.elements.performanceMessage.textContent = '📧 Sending results to Dad...';
            this.elements.performanceMessage.className = 'performance-message';
            
            const response = await fetch('/send-results', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(gameData)
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Show success message briefly
                this.elements.performanceMessage.textContent = '✅ Results sent to Dad successfully!';
                this.elements.performanceMessage.className = 'performance-message excellent';
                
                // Restore original message after 3 seconds
                setTimeout(() => {
                    this.elements.performanceMessage.textContent = originalMessage;
                    this.showPerformanceMessage(accuracy);
                }, 3000);
            } else {
                console.log('Email send failed:', result.message);
                // Restore original message if email fails
                this.elements.performanceMessage.textContent = originalMessage;
                this.showPerformanceMessage(accuracy);
            }
            
        } catch (error) {
            console.log('Email error:', error);
            // Silently fail - don't interrupt the user's game experience
            // Just log the error and continue
        }
    }
    
    randomInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new MathLearningGame();
});
