require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Create SMTP transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS.replace(/\s/g, ''), // Remove spaces from password
  },
});

// Verify SMTP connection
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP connection error:', error);
  } else {
    console.log('SMTP server is ready to send emails');
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, contact, message } = req.body;

    // Validate input
    if (!name || !contact || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'נא למלא את כל השדות' 
      });
    }

    // Email content
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: process.env.SMTP_TO,
      subject: `פנייה חדשה מהאתר - ${name}`,
      html: `
        <!DOCTYPE html>
        <html dir="rtl" lang="he">
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; direction: rtl; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #00F5D4, #00D1B2); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #00D1B2; margin-bottom: 5px; }
            .value { background: white; padding: 10px; border-radius: 4px; border-right: 3px solid #00F5D4; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>📧 פנייה חדשה מהאתר</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">👤 שם:</div>
                <div class="value">${name}</div>
              </div>
              
              <div class="field">
                <div class="label">📞 פרטי יצירת קשר:</div>
                <div class="value">${contact}</div>
              </div>
              
              <div class="field">
                <div class="label">💬 הודעה:</div>
                <div class="value">${message}</div>
              </div>
            </div>
            <div class="footer">
              <p>הודעה זו נשלחה מטופס יצירת הקשר באתר</p>
              <p>${new Date().toLocaleString('he-IL', { timeZone: 'Asia/Jerusalem' })}</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
פנייה חדשה מהאתר

שם: ${name}
פרטי יצירת קשר: ${contact}
הודעה: ${message}

תאריך: ${new Date().toLocaleString('he-IL', { timeZone: 'Asia/Jerusalem' })}
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully:', info.messageId);
    
    res.json({ 
      success: true, 
      message: 'הפרטים נשלחו בהצלחה',
      messageId: info.messageId 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'שגיאה בשליחת ההודעה. נסה שוב מאוחר יותר.' 
    });
  }
});

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📧 SMTP configured for: ${process.env.SMTP_USER}`);
});
