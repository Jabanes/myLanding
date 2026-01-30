require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('🧪 Testing SMTP Configuration...\n');

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS.replace(/\s/g, ''),
  },
});

// Test email
const testEmail = {
  from: process.env.SMTP_FROM,
  to: process.env.SMTP_TO,
  subject: '✅ Test Email - SMTP Configuration',
  html: `
    <!DOCTYPE html>
    <html dir="rtl" lang="he">
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; direction: rtl; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #00F5D4, #00D1B2); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .success { background: #d4edda; color: #155724; padding: 15px; border-radius: 4px; margin: 20px 0; text-align: center; font-weight: bold; }
        .info { background: #fff; padding: 15px; border-radius: 4px; margin: 10px 0; border-right: 3px solid #00F5D4; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 הצלחה!</h1>
          <p style="font-size: 18px; margin: 10px 0;">SMTP מוגדר בצורה תקינה</p>
        </div>
        <div class="content">
          <div class="success">
            ✅ המערכת שלך מוכנה לשלוח אימיילים!
          </div>
          
          <div class="info">
            <strong>📧 פרטי התצורה:</strong><br>
            שרת SMTP: ${process.env.SMTP_HOST}<br>
            פורט: ${process.env.SMTP_PORT}<br>
            משתמש: ${process.env.SMTP_USER}
          </div>
          
          <div class="info">
            <strong>📝 מה הלאה?</strong><br>
            • הטופס באתר שלך מוכן לשימוש<br>
            • כל פנייה תישלח ישירות למייל הזה<br>
            • ההודעות יגיעו בעיצוב מקצועי
          </div>
          
          <div class="info">
            <strong>🚀 להפעלת השרת:</strong><br>
            <code>npm start</code>
          </div>
        </div>
        <div class="footer">
          <p>אימייל בדיקה נשלח ב-${new Date().toLocaleString('he-IL', { timeZone: 'Asia/Jerusalem' })}</p>
        </div>
      </div>
    </body>
    </html>
  `,
  text: `
✅ הצלחה! SMTP מוגדר בצורה תקינה

פרטי התצורה:
- שרת: ${process.env.SMTP_HOST}
- פורט: ${process.env.SMTP_PORT}
- משתמש: ${process.env.SMTP_USER}

המערכת שלך מוכנה לשלוח אימיילים!
להפעלת השרת: npm start

תאריך: ${new Date().toLocaleString('he-IL', { timeZone: 'Asia/Jerusalem' })}
  `,
};

// Verify connection
console.log('📡 Connecting to SMTP server...');
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ SMTP Connection Failed:', error.message);
    console.log('\n💡 Possible issues:');
    console.log('   - Check your Gmail app password in .env');
    console.log('   - Ensure 2FA is enabled on your Gmail account');
    console.log('   - Verify internet connection');
    process.exit(1);
  } else {
    console.log('✅ SMTP server connection successful!\n');
    
    // Send test email
    console.log('📧 Sending test email...');
    transporter.sendMail(testEmail, (err, info) => {
      if (err) {
        console.error('❌ Failed to send test email:', err.message);
        process.exit(1);
      } else {
        console.log('✅ Test email sent successfully!');
        console.log(`📬 Message ID: ${info.messageId}`);
        console.log(`📨 Check your inbox at: ${process.env.SMTP_TO}\n`);
        console.log('🎉 Everything is working! You can now start your server with: npm start');
        process.exit(0);
      }
    });
  }
});
