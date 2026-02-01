# ⚡ Quick Start Guide

## Get your site running in 3 steps:

### Step 1: Update Your Email
Open `.env` file and replace `your-email@gmail.com` with your actual Gmail address:

```env
SMTP_USER=erez@example.com
SMTP_TO=erez@example.com
SMTP_FROM=erez@example.com
```

### Step 2: Install Dependencies
Open terminal in this folder and run:

```bash
npm install
```

### Step 3: Start the Server
```bash
npm start
```

## ✅ That's it!

Open your browser and go to: **http://localhost:3000**

---

## 📧 Testing the Contact Form

1. Fill out the contact form on your site
2. Click "שלח הודעה"
3. Check your Gmail inbox for the email!

---

## 🔄 Making Changes

While developing, use this command for auto-reload:

```bash
npm run dev
```

The server will automatically restart when you make changes.

---

## ⚠️ Important

- **Never share** your `.env` file with anyone
- **Never commit** `.env` to Git (it's already in .gitignore)
- The Gmail app password is already configured
- Keep it secure!

---

## 🆘 Need Help?

Check the full README.md for detailed instructions and troubleshooting.
