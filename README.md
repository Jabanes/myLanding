# Landing Page with Custom SMTP

Landing page with custom SMTP integration for contact form submissions.

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Edit the `.env` file and replace `your-email@gmail.com` with your actual Gmail address:

```env
SMTP_USER=your-email@gmail.com
SMTP_TO=your-email@gmail.com
SMTP_FROM=your-email@gmail.com
```

**Note:** The Gmail app password is already configured in the `.env` file.

### 3. Gmail Setup (If needed)

The app password provided should work, but if you need to generate a new one:

1. Go to your Google Account settings
2. Navigate to Security → 2-Step Verification
3. Scroll to "App passwords"
4. Generate a new app password for "Mail"
5. Replace the `SMTP_PASS` value in `.env`

## 🏃 Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000`

## 📧 How It Works

1. User fills out the contact form on the landing page
2. Form data is sent to `/api/contact` endpoint
3. Server validates the data and sends an email via Gmail SMTP
4. Beautiful HTML-formatted email is sent to your inbox
5. User sees success message

## 📁 Project Structure

```
mylanding/
├── index.html          # Landing page
├── server.js           # Express server with SMTP
├── package.json        # Dependencies
├── .env                # Environment variables (DO NOT COMMIT)
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## 🔒 Security Notes

- **NEVER** commit the `.env` file to Git
- The `.gitignore` file is configured to exclude it
- Keep your Gmail app password secure
- Consider using environment variables in production

## 🛠️ API Endpoints

### `POST /api/contact`
Submit contact form data

**Request Body:**
```json
{
  "name": "שם",
  "contact": "email או טלפון",
  "message": "הודעה"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "הפרטים נשלחו בהצלחה",
  "messageId": "<message-id>"
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "שגיאה בשליחת ההודעה"
}
```

### `GET /api/health`
Health check endpoint

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2026-01-30T..."
}
```

## 🐛 Troubleshooting

### Email not sending?
1. Check that Gmail app password is correct in `.env`
2. Ensure Gmail account has 2FA enabled
3. Check server logs for error messages
4. Verify internet connection

### Port already in use?
Change the `PORT` in `.env` file to a different number (e.g., 3001)

### Form not submitting?
1. Make sure server is running (`npm start`)
2. Check browser console for errors
3. Verify `/api/contact` endpoint is accessible

## 📝 Email Format

Emails are sent in both HTML and plain text formats with:
- Sender name
- Contact information (email/phone)
- Message content
- Timestamp in Israel timezone
- Beautiful gradient design matching your site

## 🌐 Deployment

For production deployment, consider:
- Using a process manager like PM2
- Setting up HTTPS with SSL certificates
- Using environment variables on your hosting platform
- Setting up a reverse proxy (nginx/Apache)

## 💡 Tips

- Test email sending with the `/api/health` endpoint first
- Monitor server logs for debugging
- Keep the app password secure and rotate it periodically
- Consider rate limiting for production use
