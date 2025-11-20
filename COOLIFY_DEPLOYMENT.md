# SpareTime - Coolify Deployment Guide

Complete guide to deploying SpareTime on your Coolify server.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Quick Start](#quick-start)
3. [Step-by-Step Deployment](#step-by-step-deployment)
4. [MongoDB Setup](#mongodb-setup)
5. [Environment Variables](#environment-variables)
6. [Post-Deployment](#post-deployment)
7. [Troubleshooting](#troubleshooting)
8. [Monitoring](#monitoring)

---

## 🎯 Prerequisites

Before deploying to Coolify, ensure you have:

- ✅ Coolify server installed and running
- ✅ MongoDB database (can be created in Coolify or use MongoDB Atlas)
- ✅ Domain name pointed to your Coolify server (optional but recommended)
- ✅ Git repository access (this repo)

---

## 🚀 Quick Start

### 1. Create MongoDB Database in Coolify

1. Go to your Coolify dashboard
2. Click **"+ New Resource"** → **"Database"**
3. Select **"MongoDB"**
4. Configure:
   - **Name:** `sparetime-mongodb`
   - **Version:** `6.0` or later
   - **Username:** `sparetime`
   - **Password:** (generate strong password)
   - **Database Name:** `sparetime`
5. Click **"Create"**
6. Wait for MongoDB to start (check status indicator)
7. **Copy the internal connection string** (will be something like: `mongodb://sparetime:password@mongodb:27017/sparetime`)

### 2. Deploy the Application

1. In Coolify dashboard, click **"+ New Resource"** → **"Application"**
2. Select **"Public Repository"** or **"Private Repository"**
3. Enter repository URL:
   ```
   https://github.com/oxfordpierpont/sparetime.me
   ```
4. Select branch: `claude/build-app-databases-01TpXKK3gVdzMAxCNwbXLf4B` or `main`
5. Configure build settings:
   - **Build Pack:** Dockerfile
   - **Dockerfile Location:** `./Dockerfile`
   - **Port:** `3000`

6. Click **"Continue"**

### 3. Configure Environment Variables

In the Coolify application settings, go to **"Environment Variables"** and add:

#### Required Variables

```env
NODE_ENV=production
MONGODB_URI=mongodb://sparetime:YOUR_PASSWORD@sparetime-mongodb:27017/sparetime?authSource=admin
NEXT_PUBLIC_BASE_URL=https://your-domain.com
JWT_SECRET=YOUR_SECURE_RANDOM_STRING_64_CHARS_MINIMUM
JWT_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=12
NEXT_TELEMETRY_DISABLED=1
```

**Important Notes:**
- Replace `YOUR_PASSWORD` with your MongoDB password
- Replace `sparetime-mongodb` with your actual MongoDB service name in Coolify
- Replace `your-domain.com` with your actual domain
- Generate `JWT_SECRET` with: `openssl rand -base64 64`

#### Optional Variables

```env
# Email notifications
EMAIL_SERVICE_PROVIDER=sendgrid
EMAIL_API_KEY=your_api_key
EMAIL_FROM_ADDRESS=noreply@yourdomain.com

# Google Calendar Integration
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REDIRECT_URI=https://your-domain.com/api/auth/google/callback

# Rate limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Feature flags
ENABLE_GOOGLE_CALENDAR=false
ENABLE_EMAIL_NOTIFICATIONS=false
ENABLE_ANALYTICS=true
```

### 4. Configure Domain (Optional but Recommended)

1. In Coolify application settings, go to **"Domains"**
2. Add your domain: `sparetime.yourdomain.com`
3. Enable **"Generate SSL Certificate"** (Let's Encrypt)
4. Update `NEXT_PUBLIC_BASE_URL` environment variable with your domain

### 5. Deploy

1. Click **"Deploy"** button
2. Watch the build logs
3. Wait for deployment to complete (~3-5 minutes)
4. Check the health status

---

## 📚 Step-by-Step Deployment

### Method A: Using Coolify UI (Recommended)

#### Step 1: Prepare MongoDB

**Option 1: Create MongoDB in Coolify**

1. Navigate to **Resources** → **+ New Resource** → **Database**
2. Select **MongoDB**
3. Fill in details:
   ```
   Name: sparetime-mongodb
   Version: 6.0
   Root Username: sparetime
   Root Password: [Generate Strong Password]
   Database Name: sparetime
   ```
4. Click **Create**
5. Wait for **Running** status
6. Copy the **Internal Connection String**:
   ```
   mongodb://sparetime:PASSWORD@sparetime-mongodb:27017/sparetime?authSource=admin
   ```

**Option 2: Use MongoDB Atlas (Cloud)**

1. Create account at [mongodb.com/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Create database user
4. Whitelist IP: `0.0.0.0/0` (allow all)
5. Get connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/sparetime
   ```

#### Step 2: Create Application in Coolify

1. Go to **Resources** → **+ New Resource** → **Application**

2. **Source Configuration:**
   - Repository Type: **Public Repository** (or Private if using SSH key)
   - Repository URL: `https://github.com/oxfordpierpont/sparetime.me`
   - Branch: `claude/build-app-databases-01TpXKK3gVdzMAxCNwbXLf4B`

3. **Build Configuration:**
   - Build Pack: **Dockerfile**
   - Dockerfile Path: `./Dockerfile`
   - Build Arguments: (leave empty)

4. **General Settings:**
   - Application Name: `sparetime-app`
   - Port: `3000`
   - Health Check Path: `/api/health`
   - Health Check Interval: `30s`

5. Click **Save** and **Continue**

#### Step 3: Configure Environment Variables

In **Application Settings** → **Environment Variables**, add:

**Group 1: Core Settings**
```bash
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
PORT=3000
```

**Group 2: Database** (REQUIRED)
```bash
MONGODB_URI=mongodb://sparetime:YOUR_MONGODB_PASSWORD@sparetime-mongodb:27017/sparetime?authSource=admin
```

**Group 3: Application URL** (REQUIRED)
```bash
NEXT_PUBLIC_BASE_URL=https://sparetime.yourdomain.com
```

**Group 4: Security** (REQUIRED - Generate strong values!)
```bash
JWT_SECRET=RUN_THIS_COMMAND_openssl_rand_base64_64
JWT_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=12
```

**Group 5: Optional Integrations**
```bash
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
EMAIL_API_KEY=
```

**Save** the environment variables.

#### Step 4: Configure Domain & SSL

1. Go to **Domains** tab
2. Click **+ Add Domain**
3. Enter your domain: `sparetime.yourdomain.com`
4. Enable: ✅ **Generate SSL Certificate**
5. Enable: ✅ **Force HTTPS**
6. Click **Save**

Make sure your DNS A record points to your Coolify server IP.

#### Step 5: Deploy

1. Go to **Deployments** tab
2. Click **Deploy** button
3. Watch the build logs in real-time
4. Wait for status: **✅ Running**

#### Step 6: Seed Database (One-time)

After first deployment, seed the database with sample data:

1. Go to **Terminal** tab in Coolify application
2. Run:
   ```bash
   node scripts/seed-database.js
   ```
3. You should see output with sample users created
4. Test credentials:
   ```
   Email: john.doe@example.com
   Password: password123
   ```

---

## 🗄️ MongoDB Setup

### Using Coolify MongoDB

**Advantages:**
- ✅ Integrated with Coolify
- ✅ Automatic backups (if configured)
- ✅ Easy management
- ✅ Internal networking (faster)

**Connection String Format:**
```
mongodb://USERNAME:PASSWORD@SERVICE_NAME:27017/DATABASE_NAME?authSource=admin
```

**Example:**
```
mongodb://sparetime:mySecurePass123@sparetime-mongodb:27017/sparetime?authSource=admin
```

**Important Notes:**
- Use the **internal service name** (e.g., `sparetime-mongodb`)
- Do NOT use `localhost` or `127.0.0.1`
- Include `?authSource=admin` for authentication

### Using MongoDB Atlas (Cloud)

**Advantages:**
- ✅ Fully managed
- ✅ Free tier available
- ✅ Automatic backups
- ✅ Global distribution

**Setup:**

1. Create account: [mongodb.com/atlas](https://www.mongodb.com/cloud/atlas)
2. Create cluster (M0 Free tier)
3. Security → Database Access → Add User:
   ```
   Username: sparetime
   Password: [Generate Strong Password]
   Role: Atlas Admin
   ```
4. Security → Network Access → Add IP Address:
   ```
   0.0.0.0/0 (Allow from anywhere)
   ```
5. Get connection string:
   ```
   mongodb+srv://sparetime:PASSWORD@cluster0.xxxxx.mongodb.net/sparetime
   ```

---

## 🔐 Environment Variables Reference

### Required Variables

| Variable | Description | Example | How to Get |
|----------|-------------|---------|------------|
| `NODE_ENV` | Environment mode | `production` | Fixed value |
| `MONGODB_URI` | MongoDB connection | `mongodb://...` | MongoDB service |
| `NEXT_PUBLIC_BASE_URL` | Your app URL | `https://app.com` | Your domain |
| `JWT_SECRET` | Token signing key | (64 char string) | `openssl rand -base64 64` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `JWT_EXPIRES_IN` | Token expiration | `7d` |
| `BCRYPT_SALT_ROUNDS` | Password hashing rounds | `12` |
| `GOOGLE_CLIENT_ID` | Google OAuth ID | - |
| `GOOGLE_CLIENT_SECRET` | Google OAuth secret | - |
| `EMAIL_API_KEY` | Email service key | - |
| `ENABLE_GOOGLE_CALENDAR` | Enable Google Calendar | `false` |
| `ENABLE_EMAIL_NOTIFICATIONS` | Enable email | `false` |

---

## ✅ Post-Deployment

### 1. Verify Deployment

**Check Health Endpoint:**
```bash
curl https://your-domain.com/api/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-01-15T10:00:00.000Z",
  "database": {
    "connected": true,
    "status": "healthy"
  },
  "version": "1.0.0"
}
```

### 2. Test Authentication

**Sign Up Test:**
```bash
curl -X POST https://your-domain.com/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "username": "testuser",
    "password": "password123",
    "displayName": "Test User"
  }'
```

**Login Test:**
```bash
curl -X POST https://your-domain.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 3. Seed Database (Optional)

If you want sample data:

1. Access Coolify terminal for your app
2. Run: `node scripts/seed-database.js`
3. This creates 3 users, calendars, events, links, etc.

Test credentials:
```
Email: john.doe@example.com
Password: password123
```

### 4. Configure Backups (Recommended)

**For Coolify MongoDB:**
1. Go to your MongoDB resource in Coolify
2. Navigate to **Backups** tab
3. Enable **Automatic Backups**
4. Set schedule (e.g., daily at 2 AM)
5. Configure retention (e.g., keep 7 days)

**For MongoDB Atlas:**
- Backups are automatic on all plans
- Configure retention in Atlas dashboard

---

## 🔧 Troubleshooting

### Build Fails

**Error: "Cannot find module 'mongoose'"**
```bash
# Solution: Check package.json includes mongoose
# Run: npm install mongoose bcryptjs dotenv
```

**Error: "Dockerfile not found"**
```bash
# Solution: Check Dockerfile is in root directory
# Verify in repository
```

### Database Connection Issues

**Error: "MongoServerError: Authentication failed"**
```bash
# Solution: Check MONGODB_URI credentials
# Ensure ?authSource=admin is included
# Example: mongodb://user:pass@host:27017/db?authSource=admin
```

**Error: "getaddrinfo ENOTFOUND mongodb"**
```bash
# Solution: Use correct service name
# Use internal service name, not localhost
# Example: sparetime-mongodb:27017 (not localhost:27017)
```

### Application Crashes

**Check Logs:**
1. Go to Coolify application
2. Click **Logs** tab
3. Look for error messages

**Common Issues:**

1. **Missing environment variables:**
   ```
   Error: MONGODB_URI is not defined
   Solution: Add MONGODB_URI to environment variables
   ```

2. **Port already in use:**
   ```
   Error: Port 3000 already in use
   Solution: Stop other services or change PORT variable
   ```

3. **Health check failing:**
   ```
   Error: Health check timeout
   Solution: Increase health check timeout to 60s
   Solution: Check /api/health endpoint is accessible
   ```

### SSL Certificate Issues

**Error: "Certificate generation failed"**
```bash
# Solution 1: Check DNS is pointed correctly
dig your-domain.com

# Solution 2: Verify port 80 and 443 are open
# On your server:
sudo ufw status

# Solution 3: Wait 5-10 minutes for DNS propagation
```

---

## 📊 Monitoring

### Built-in Health Check

Coolify automatically monitors: `https://your-domain.com/api/health`

**Healthy Response:**
```json
{
  "status": "ok",
  "database": { "connected": true }
}
```

**Unhealthy Response (503):**
```json
{
  "status": "degraded",
  "database": { "connected": false }
}
```

### View Logs

**Application Logs:**
1. Coolify → Your Application → **Logs** tab
2. Real-time log streaming
3. Search and filter logs

**MongoDB Logs:**
1. Coolify → MongoDB Resource → **Logs** tab

### Metrics

Coolify provides:
- CPU usage
- Memory usage
- Network traffic
- Request count
- Response times

Access via: Application → **Metrics** tab

---

## 🚀 Performance Optimization

### 1. Enable Caching (Optional)

Add Redis for caching:

1. Create Redis in Coolify:
   ```
   Resource → + New → Database → Redis
   Name: sparetime-redis
   ```

2. Add to environment:
   ```env
   REDIS_URL=redis://sparetime-redis:6379
   ```

### 2. Configure CDN (Optional)

Use Cloudflare for static assets:

1. Add domain to Cloudflare
2. Enable proxy (orange cloud)
3. Enable caching rules
4. Set page rules for `/logos/*` and `/public/*`

### 3. Database Indexing

Indexes are already created in the models.
To verify in MongoDB:

```bash
# Access MongoDB terminal in Coolify
# Then run:
use sparetime
db.users.getIndexes()
db.links.getIndexes()
```

---

## 🔄 Updates and Redeployment

### Automatic Deployments

Coolify can auto-deploy on git push:

1. Application Settings → **Source**
2. Enable: ✅ **Automatic Deployment**
3. Select branch to watch
4. Save

Now every push to that branch triggers a rebuild.

### Manual Deployment

1. Go to your application in Coolify
2. Click **Deploy** button
3. Wait for build to complete

### Rollback

If deployment fails:

1. Go to **Deployments** tab
2. Find previous successful deployment
3. Click **Rollback** button

---

## 📋 Checklist

Before going live:

- [ ] MongoDB database created and running
- [ ] All required environment variables set
- [ ] JWT_SECRET is strong and unique (64+ characters)
- [ ] Domain configured with SSL
- [ ] Health check endpoint returns 200
- [ ] Database seeded (optional)
- [ ] Signup and login tested
- [ ] Backups configured
- [ ] Monitoring enabled
- [ ] DNS pointed correctly
- [ ] SSL certificate generated
- [ ] Application is accessible at domain
- [ ] All API endpoints tested

---

## 📞 Support

### Resources

- **Coolify Docs:** [https://coolify.io/docs](https://coolify.io/docs)
- **SpareTime Docs:** See `DATABASE_README.md` and `API_REFERENCE.md`
- **MongoDB Docs:** [https://docs.mongodb.com](https://docs.mongodb.com)

### Common Commands

**View Application Logs:**
```bash
# In Coolify terminal
docker logs -f sparetime-app --tail 100
```

**Access Database:**
```bash
# In MongoDB terminal (Coolify)
use sparetime
db.users.find().limit(5)
```

**Check Health:**
```bash
curl https://your-domain.com/api/health
```

**Test API:**
```bash
curl https://your-domain.com/api/auth/signup -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","username":"test","password":"pass123","displayName":"Test"}'
```

---

## 🎉 Success!

If everything is working:

- ✅ Health check returns status "ok"
- ✅ Application accessible at your domain
- ✅ Can sign up new users
- ✅ Can log in successfully
- ✅ Database connection is healthy
- ✅ SSL certificate is active

Your SpareTime app is now live on Coolify! 🚀

---

**Last Updated:** November 20, 2025
**Coolify Version:** 4.0+
**Next.js Version:** 16.0.3
**MongoDB Version:** 6.0+
