const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Email configuration - try multiple approaches for kids accounts
const EMAIL_CONFIG = {
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-password'
    },
    // More permissive settings for kids accounts
    tls: {
        rejectUnauthorized: false,
        ciphers: 'SSLv3'
    },
    requireTLS: true,
    debug: true
};

const DAD_EMAIL = process.env.DAD_EMAIL || 'dad@example.com';
const GRANDMA_EMAIL = process.env.GRANDMA_EMAIL || 'grandma@example.com';
const FAMILY_EMAILS = [DAD_EMAIL, GRANDMA_EMAIL].filter(email => email && !email.includes('example.com'));

// Create nodemailer transporter
const transporter = nodemailer.createTransport(EMAIL_CONFIG);

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Email endpoint
app.post('/send-results', async (req, res) => {
    console.log('\n📧 EMAIL REQUEST RECEIVED:');
    console.log('   ⏰ Time:', new Date().toLocaleString());
    
    try {
        const {
            score,
            accuracy,
            totalTime,
            difficulty,
            operation,
            questionsAnswered,
            correctAnswers,
            playerName
        } = req.body;
        
        console.log('   👤 Player:', playerName || 'No name provided');
        console.log('   📊 Score:', score, 'points');
        console.log('   🎯 Accuracy:', accuracy + '%');
        console.log('   📤 Sending from:', EMAIL_CONFIG.auth.user);
        console.log('   👨 Sending to Dad:', DAD_EMAIL);
        console.log('   👵 Sending to Grandma:', GRANDMA_EMAIL);

        // Format the email content
        const emailContent = `
Hi Dad! 👋

I just finished playing the Math Learning Game and wanted to share my results with you!

🎮 GAME RESULTS 🎮
==============================
👤 Player: ${playerName || 'Your Child'}
📊 Final Score: ${score} points
🎯 Accuracy: ${accuracy}%
⏱️  Total Time: ${totalTime}
📝 Questions: ${questionsAnswered}/10 answered
✅ Correct Answers: ${correctAnswers}
🔢 Difficulty: ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
➕ Operation: ${operation.charAt(0).toUpperCase() + operation.slice(1)}

${accuracy >= 90 ? '🌟 EXCELLENT WORK! Math superstar! 🌟' : 
  accuracy >= 70 ? '👏 GOOD JOB! Keep practicing! 👏' : 
  '📚 Keep practicing! Getting better every day! 📚'}

${accuracy >= 80 ? 'I\'m getting really good at math!' : 'I\'m working hard to improve my math skills!'}

Love you! ❤️

---
Sent automatically from the Math Learning Game 🧮
        `;

        const mailOptions = {
            from: `"${playerName || 'Autumn'} (via Math Game)" <${EMAIL_CONFIG.auth.user}>`,
            to: [DAD_EMAIL, GRANDMA_EMAIL],
            subject: `🧮 ${playerName || 'Autumn'}'s Math Game Results - ${accuracy}% Score!`,
            text: emailContent,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 10px;">
                    <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h1 style="color: #4a5568; text-align: center; margin-bottom: 20px;">🧮 Math Game Results 🎯</h1>
                        
                        <div style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                            <h2 style="color: #2d3748; margin-bottom: 15px;">Hi Dad! 👋</h2>
                            <p style="color: #2d3748; font-size: 16px;">I just finished playing the Math Learning Game and wanted to share my results with you!</p>
                        </div>
                        
                        <div style="background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%); padding: 25px; border-radius: 10px; margin-bottom: 20px;">
                            <h3 style="color: #2d3748; margin-bottom: 20px; text-align: center;">🎮 GAME RESULTS 🎮</h3>
                            <table style="width: 100%; color: #2d3748; font-size: 16px;">
                                <tr style="margin-bottom: 10px;">
                                    <td style="padding: 8px 0; font-weight: bold;">👤 Player:</td>
                                    <td style="padding: 8px 0;">${playerName || 'Your Child'}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-weight: bold;">📊 Final Score:</td>
                                    <td style="padding: 8px 0; color: #667eea; font-weight: bold;">${score} points</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-weight: bold;">🎯 Accuracy:</td>
                                    <td style="padding: 8px 0; color: ${accuracy >= 90 ? '#56ab2f' : accuracy >= 70 ? '#ff9500' : '#ff6b6b'}; font-weight: bold;">${accuracy}%</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-weight: bold;">⏱️ Total Time:</td>
                                    <td style="padding: 8px 0;">${totalTime}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-weight: bold;">📝 Questions:</td>
                                    <td style="padding: 8px 0;">${questionsAnswered}/10 answered</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-weight: bold;">✅ Correct:</td>
                                    <td style="padding: 8px 0;">${correctAnswers}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-weight: bold;">🔢 Difficulty:</td>
                                    <td style="padding: 8px 0;">${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-weight: bold;">➕ Operation:</td>
                                    <td style="padding: 8px 0;">${operation.charAt(0).toUpperCase() + operation.slice(1)}</td>
                                </tr>
                            </table>
                        </div>
                        
                        <div style="background: ${accuracy >= 90 ? 'linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%)' : 
                                                accuracy >= 70 ? 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' : 
                                                'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'}; 
                                     padding: 20px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
                            <h3 style="color: ${accuracy >= 70 ? '#2d3748' : '#2d3748'}; margin-bottom: 10px;">
                                ${accuracy >= 90 ? '🌟 EXCELLENT WORK! Math superstar! 🌟' : 
                                  accuracy >= 70 ? '👏 GOOD JOB! Keep practicing! 👏' : 
                                  '📚 Keep practicing! Getting better every day! 📚'}
                            </h3>
                            <p style="color: ${accuracy >= 70 ? '#2d3748' : '#2d3748'}; font-size: 16px;">
                                ${accuracy >= 80 ? 'I\'m getting really good at math!' : 'I\'m working hard to improve my math skills!'}
                            </p>
                        </div>
                        
                        <div style="text-align: center; color: #667eea; font-size: 18px; margin-top: 20px;">
                            Love you! ❤️
                        </div>
                        
                        <div style="text-align: center; color: #999; font-size: 12px; margin-top: 20px; border-top: 1px solid #e2e8f0; padding-top: 15px;">
                            Sent automatically from the Math Learning Game 🧮
                        </div>
                    </div>
                </div>
            `
        };

        console.log('   🚀 Attempting to send email...');
        
        const emailResult = await transporter.sendMail(mailOptions);
        
        console.log('   ✅ EMAIL SENT SUCCESSFULLY!');
        console.log('   🆔 Message ID:', emailResult.messageId);
        console.log('   💬 Subject:', mailOptions.subject);
        console.log('   ⏱️ Completed at:', new Date().toLocaleString());
        console.log('');
        
        res.json({ success: true, message: 'Results sent to dad successfully!' });

    } catch (error) {
        console.log('   ❌ EMAIL FAILED!');
        console.log('   🚫 Error type:', error.code || 'Unknown');
        console.log('   📝 Error message:', error.message);
        console.log('   🔍 Details:', error);
        console.log('');
        
        // Check for common Gmail errors
        if (error.message.includes('Invalid login')) {
            console.log('   💡 SUGGESTION: You may need to use an App Password instead of your regular password');
            console.log('   🔗 Guide: https://support.google.com/accounts/answer/185833');
        } else if (error.message.includes('authentication')) {
            console.log('   💡 SUGGESTION: Check your email and password in the .env file');
        }
        console.log('');
        
        res.status(500).json({ 
            success: false, 
            message: 'Failed to send email. Check server logs for details.' 
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log('=' .repeat(60));
    console.log(`🚀 Math Learning Game server running at http://localhost:${PORT}`);
    console.log('📧 Email functionality enabled!');
    console.log('');
    console.log('📋 CURRENT CONFIGURATION:');
    console.log(`   📤 From: ${process.env.EMAIL_USER || 'NOT SET'}`);
    console.log(`   📥 To: ${process.env.DAD_EMAIL || 'NOT SET'}`);
    console.log(`   🔑 Password: ${process.env.EMAIL_PASS ? '***SET***' : 'NOT SET'}`);
    console.log(`   🌐 SMTP Host: ${EMAIL_CONFIG.host}:${EMAIL_CONFIG.port}`);
    console.log('');
    
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.DAD_EMAIL) {
        console.log('⚠️  EMAIL SETUP INCOMPLETE:');
        if (!process.env.EMAIL_USER) console.log('   ❌ EMAIL_USER not set');
        if (!process.env.EMAIL_PASS) console.log('   ❌ EMAIL_PASS not set');
        if (!process.env.DAD_EMAIL) console.log('   ❌ DAD_EMAIL not set');
        console.log('');
        console.log('🔧 To fix: Edit the .env file with your email settings');
    } else {
        console.log('✅ Email configuration looks complete!');
        console.log('🎮 Ready to send game results automatically!');
    }
    
    console.log('');
    console.log('📂 Game files:');
    console.log('   • index.html - Main game interface');
    console.log('   • script.js - Game logic with auto-email');
    console.log('   • styles.css - Beautiful game styling');
    console.log('');
    console.log('🎯 Open http://localhost:3000 to start playing!');
    console.log('=' .repeat(60));
});
