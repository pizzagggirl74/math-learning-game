// Alternative solution for kids accounts - generates a shareable report
const fs = require('fs');
const path = require('path');

function generateGameReport(gameData) {
    const timestamp = new Date().toLocaleString();
    const reportHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${gameData.playerName}'s Math Game Results</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        .report-card {
            background: white;
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            text-align: center;
        }
        .header {
            background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
            padding: 20px;
            border-radius: 15px;
            margin-bottom: 25px;
        }
        .results {
            background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
            padding: 25px;
            border-radius: 15px;
            margin-bottom: 25px;
        }
        .performance {
            background: ${gameData.accuracy >= 90 ? 'linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%)' : 
                               gameData.accuracy >= 70 ? 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' : 
                               'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'};
            padding: 20px;
            border-radius: 15px;
            color: #2d3748;
            font-weight: bold;
            margin-bottom: 20px;
        }
        table { width: 100%; margin: 20px 0; }
        td { padding: 8px; text-align: left; }
        td:first-child { font-weight: bold; }
        .score { font-size: 2em; color: #667eea; font-weight: bold; }
        .instructions {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 10px;
            margin-top: 20px;
            font-size: 14px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="report-card">
        <h1>🧮 Math Game Results 🎯</h1>
        
        <div class="header">
            <h2>Hi Dad! 👋</h2>
            <p>I just finished playing the Math Learning Game and wanted to share my results with you!</p>
            <p><em>Generated on ${timestamp}</em></p>
        </div>
        
        <div class="results">
            <h3>🎮 GAME RESULTS</h3>
            <table>
                <tr><td>👤 Player:</td><td>${gameData.playerName}</td></tr>
                <tr><td>📊 Final Score:</td><td class="score">${gameData.score} points</td></tr>
                <tr><td>🎯 Accuracy:</td><td style="color: ${gameData.accuracy >= 90 ? '#56ab2f' : gameData.accuracy >= 70 ? '#ff9500' : '#ff6b6b'}; font-weight: bold;">${gameData.accuracy}%</td></tr>
                <tr><td>⏱️ Total Time:</td><td>${gameData.totalTime}</td></tr>
                <tr><td>📝 Questions:</td><td>${gameData.questionsAnswered}/10 answered</td></tr>
                <tr><td>✅ Correct:</td><td>${gameData.correctAnswers}</td></tr>
                <tr><td>🔢 Difficulty:</td><td>${gameData.difficulty.charAt(0).toUpperCase() + gameData.difficulty.slice(1)}</td></tr>
                <tr><td>➕ Operation:</td><td>${gameData.operation.charAt(0).toUpperCase() + gameData.operation.slice(1)}</td></tr>
            </table>
        </div>
        
        <div class="performance">
            <h3>${gameData.accuracy >= 90 ? '🌟 EXCELLENT WORK! Math superstar! 🌟' : 
                   gameData.accuracy >= 70 ? '👏 GOOD JOB! Keep practicing! 👏' : 
                   '📚 Keep practicing! Getting better every day! 📚'}</h3>
            <p>${gameData.accuracy >= 80 ? "I'm getting really good at math!" : "I'm working hard to improve my math skills!"}</p>
        </div>
        
        <div style="font-size: 18px; color: #667eea; margin: 20px 0;">
            Love you! ❤️
        </div>
        
        <div class="instructions">
            <h4>📱 How to share this with Dad:</h4>
            <p>1. Take a screenshot of this page, or</p>
            <p>2. Send Dad the file: <code>math-results-${gameData.playerName}-${Date.now()}.html</code></p>
            <p>3. Or just show him on your screen!</p>
        </div>
        
        <div style="border-top: 1px solid #e2e8f0; padding-top: 15px; margin-top: 20px; font-size: 12px; color: #999;">
            Sent automatically from the Math Learning Game 🧮
        </div>
    </div>
</body>
</html>`;

    return reportHtml;
}

module.exports = { generateGameReport };
