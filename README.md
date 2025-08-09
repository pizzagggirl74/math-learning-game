# 🧮 Math Learning Game 🎯

A fun, interactive math learning game designed to help students practice basic arithmetic operations with engaging visual feedback and progress tracking.

## 🎮 Features

- **Multiple Difficulty Levels**: Easy (1-10), Medium (1-50), Hard (1-100)
- **Various Operations**: Addition, Subtraction, Multiplication, Division, and Mixed
- **Score & Streak System**: Earn points with streak multipliers for consecutive correct answers
- **Real-time Feedback**: Instant visual and text feedback for each answer
- **Progress Tracking**: Visual progress bar and detailed statistics
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Colorful Interface**: Kid-friendly design with smooth animations

## 🚀 How to Play

1. **Choose Your Settings**:
   - Select difficulty level (Easy, Medium, or Hard)
   - Pick operation type (Addition, Subtraction, Multiplication, Division, or Mixed)

2. **Start Playing**:
   - Click "Start New Game" to begin
   - Answer 10 math questions
   - Type your answer and press Enter or click Submit

3. **Track Your Progress**:
   - Watch your score and streak grow
   - See real-time statistics
   - Get performance feedback at the end

## 🎯 Scoring System

- **Base Points**: Easy (10pts), Medium (15pts), Hard (20pts)
- **Streak Multiplier**: Up to 2x points for consecutive correct answers
- **Final Grade**: Based on accuracy percentage

## 🛠️ How to Run

### Simple Version (No Email)
1. Open `index.html` directly in any modern web browser
2. No installation required!

### With Email Functionality
1. Clone or download this repository
2. Install dependencies: `npm install`
3. Set up email configuration (see Email Setup below)
4. Start the server: `npm start`
5. Open http://localhost:3000 in your browser

## 📧 Email Setup

To automatically email results to dad:

1. **Copy the example config file:**
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` with your email settings:**
   - `EMAIL_USER`: Your email address
   - `EMAIL_PASS`: Your email app password (NOT your regular password)
   - `DAD_EMAIL`: Your dad's email address

3. **For Gmail users:**
   - Go to Google Account Settings → Security → 2-Step Verification
   - Generate an "App Password" specifically for this application
   - Use the app password in the `EMAIL_PASS` field

4. **Alternative setup with environment variables:**
   ```bash
   export EMAIL_USER="your-email@gmail.com"
   export EMAIL_PASS="your-app-password"
   export DAD_EMAIL="dad@example.com"
   npm start
   ```

**Email Features:**
- 📤 Automatically sends results when each game ends
- 🎨 Beautiful HTML-formatted emails with game statistics
- 📊 Includes score, accuracy, time, difficulty, and operation type
- 💝 Personalized messages based on performance

## 📁 Files

- `index.html` - Main game interface
- `styles.css` - Beautiful styling and animations
- `script.js` - Game logic and interactivity
- `README.md` - This file

## 🌟 Educational Benefits

- Reinforces basic math skills
- Builds confidence through positive feedback
- Encourages practice with streak rewards
- Adapts to different skill levels
- Makes learning math fun and engaging

## 🎨 Customization

The game is built with clean, modular code that's easy to customize:
- Add new difficulty levels
- Include more operations (fractions, percentages, etc.)
- Modify scoring system
- Change visual themes
- Add sound effects

---

**Have fun learning math! 📚✨**
