# 🚀 SpareTime - Coolify Quick Start

Deploy your SpareTime app to Coolify in **under 10 minutes**.

---

## ⚡ 5-Minute Setup

### Step 1: Create MongoDB (2 minutes)

1. Open Coolify → **+ New Resource** → **Database** → **MongoDB**
2. Fill in:
   ```
   Name: sparetime-mongodb
   Version: 6.0
   Username: sparetime
   Password: [Click Generate] → Copy this password!
   Database: sparetime
   ```
3. Click **Create** → Wait for **Running** status
4. Copy the connection string shown (you'll need this in Step 3)

---

### Step 2: Create Application (1 minute)

1. Coolify → **+ New Resource** → **Application** → **Public Repository**
2. Enter:
   ```
   Repository: https://github.com/oxfordpierpont/sparetime.me
   Branch: claude/build-app-databases-01TpXKK3gVdzMAxCNwbXLf4B
   Build Pack: Dockerfile
   Port: 3000
   ```
3. Click **Save & Continue**

---

### Step 3: Set Environment Variables (2 minutes)

Go to **Environment Variables** tab and add these **4 REQUIRED** variables:

```env
# 1. MongoDB Connection (use the one from Step 1)
MONGODB_URI=mongodb://sparetime:YOUR_PASSWORD@sparetime-mongodb:27017/sparetime?authSource=admin

# 2. Your Domain (or use Coolify's default)
NEXT_PUBLIC_BASE_URL=https://your-app-url.coolify.io

# 3. Security Secret (run this command to generate)
# Run: openssl rand -base64 64
JWT_SECRET=PASTE_GENERATED_SECRET_HERE

# 4. Production mode
NODE_ENV=production
```

**Optional but recommended:**
```env
JWT_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=12
NEXT_TELEMETRY_DISABLED=1
```

Click **Save**.

---

### Step 4: Configure Domain (1 minute)

1. Go to **Domains** tab
2. Either use Coolify's default: `sparetime.coolify.io`
3. Or add your custom domain: `app.yourdomain.com`
4. Enable ✅ **Generate SSL Certificate**
5. Click **Save**

---

### Step 5: Deploy! (3-5 minutes)

1. Click the big **Deploy** button
2. Watch the build logs (optional but cool)
3. Wait for **✅ Running** status
4. **Done!** 🎉

---

## ✅ Verify It's Working

### Test Health Check
```bash
curl https://your-domain.com/api/health
```

Should return:
```json
{
  "status": "ok",
  "database": { "connected": true }
}
```

### Test Signup
```bash
curl -X POST https://your-domain.com/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "you@example.com",
    "username": "yourname",
    "password": "securepass123",
    "displayName": "Your Name"
  }'
```

### Access Your App
Visit: `https://your-domain.com`

You should see the SpareTime homepage!

---

## 🎁 Optional: Add Sample Data

Want to test with realistic data?

1. In Coolify, go to your app → **Terminal** tab
2. Run this command:
   ```bash
   node scripts/seed-database.js
   ```
3. This creates 3 users, calendars, events, links, requests, etc.

**Test Login:**
```
Email: john.doe@example.com
Password: password123
```

---

## 🔧 Common Issues

### MongoDB Connection Failed
**Error:** "MongoServerError: Authentication failed"

**Fix:**
```env
# Make sure MONGODB_URI has ?authSource=admin at the end
MONGODB_URI=mongodb://user:pass@sparetime-mongodb:27017/sparetime?authSource=admin
#                                                                  ^^^^^^^^^^^^^ Important!
```

### Build Failed
**Error:** "Cannot find module..."

**Fix:** Check that `package.json` includes all dependencies. Should have:
```json
{
  "dependencies": {
    "mongoose": "^8.20.0",
    "bcryptjs": "^3.0.3",
    "dotenv": "^17.2.3"
  }
}
```

### Health Check Failing
**Error:** Health check returns 503

**Fix:**
1. Check MongoDB is running (Coolify → MongoDB → Status)
2. Check MONGODB_URI is correct
3. Check logs: Coolify → App → Logs tab

---

## 📱 What You Can Do Now

After deployment:

✅ **Sign Up** - Create new user accounts at `/signup`
✅ **Log In** - Access dashboard at `/login`
✅ **Create Links** - Make shareable availability links
✅ **Manage Calendar** - Add events and protected time
✅ **Receive Requests** - People can request time with you
✅ **View Analytics** - See link views and request stats

---

## 📖 Next Steps

### Configure Custom Domain
1. Point your domain's DNS to Coolify server
2. Add domain in Coolify
3. SSL will auto-generate via Let's Encrypt

### Enable Auto-Deploy
1. App Settings → **Source**
2. Enable ✅ **Automatic Deployment on Push**
3. Now every git push rebuilds your app

### Set Up Backups
1. MongoDB → **Backups** tab
2. Enable automatic backups
3. Set schedule (e.g., daily at 2 AM)

### Add Email Notifications
1. Get SendGrid or Mailgun API key
2. Add environment variables:
   ```env
   EMAIL_API_KEY=your_key
   EMAIL_FROM_ADDRESS=noreply@yourdomain.com
   ENABLE_EMAIL_NOTIFICATIONS=true
   ```
3. Redeploy

### Add Google Calendar Integration
1. Get OAuth credentials from Google Cloud Console
2. Add environment variables:
   ```env
   GOOGLE_CLIENT_ID=your_id
   GOOGLE_CLIENT_SECRET=your_secret
   GOOGLE_REDIRECT_URI=https://your-domain.com/api/auth/google/callback
   ENABLE_GOOGLE_CALENDAR=true
   ```
3. Redeploy

---

## 🆘 Need Help?

### Resources
- **Full Guide:** See `COOLIFY_DEPLOYMENT.md` for detailed instructions
- **API Docs:** See `docs/API_REFERENCE.md`
- **Database Docs:** See `DATABASE_README.md`
- **Coolify Docs:** [coolify.io/docs](https://coolify.io/docs)

### Check Logs
Coolify → Your App → **Logs** tab

### Check MongoDB
Coolify → MongoDB → **Terminal** tab
```bash
use sparetime
db.users.find().pretty()
```

---

## 🎉 Success Checklist

- [ ] MongoDB created and running
- [ ] App deployed and running
- [ ] Health check returns "ok"
- [ ] Can access app at domain
- [ ] SSL certificate active (https://)
- [ ] Can sign up new user
- [ ] Can log in
- [ ] Database connection healthy

---

**That's it! Your SpareTime app is live! 🚀**

For detailed configuration, troubleshooting, and advanced features, see `COOLIFY_DEPLOYMENT.md`.

---

**Quick Start Version:** 1.0
**Estimated Time:** 10 minutes
**Difficulty:** Easy ⭐
