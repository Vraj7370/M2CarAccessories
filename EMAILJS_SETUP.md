# 📧 EmailJS Setup Guide — M2 Car Accessories

This website uses **EmailJS** (free, no backend needed) to send emails directly from the browser.

## Step 1: Create Free Account
1. Go to https://emailjs.com
2. Sign up with your email: mannpatel@m2caraccessories.com

## Step 2: Add Email Service
1. Dashboard → Email Services → Add New Service
2. Choose **Gmail** (recommended)
3. Connect your Gmail account
4. Copy the **Service ID** (e.g. `service_abc123`)

## Step 3: Create Two Email Templates

### Template 1 — Appointment (appointment_template)
Subject: `New Appointment Request — {{service}}`
Body:
```
New Appointment Request from M2 Car Accessories Website

Name: {{from_name}}
Phone: {{phone}}
Vehicle: {{vehicle}}
Service: {{service}}
Date: {{date}}
Time: {{time}}
Notes: {{notes}}
```

### Template 2 — Contact (contact_template)
Subject: `New Inquiry from {{from_name}}`
Body:
```
New Contact Inquiry from M2 Website

Name: {{from_name}}
Phone: {{phone}}
Email: {{email}}
Vehicle: {{vehicle}}
Message: {{message}}
```

## Step 4: Get Your Public Key
1. Dashboard → Account → General → Public Key
2. Copy it

## Step 5: Update siteData.js
Open `src/data/siteData.js` and update:

```js
emailjs: {
  serviceId: "service_XXXXXX",          // ← Your Service ID
  appointmentTemplateId: "template_XXXX", // ← Appointment Template ID
  contactTemplateId: "template_XXXX",    // ← Contact Template ID
  publicKey: "XXXXXXXXXXXXXXXXXXXX",      // ← Your Public Key
},
```

## ✅ Done!
Once configured, every form submission will send an email directly to your inbox.
No server, no monthly cost (free plan = 200 emails/month).
