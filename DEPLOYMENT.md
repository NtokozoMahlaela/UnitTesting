# Railway Deployment Guide

## Quick Deploy to Railway

### Prerequisites:
1. Git repository (you already have it!)
2. Railway account (free tier available)

### Steps:

1. **Go to Railway Dashboard**
   - Visit: https://railway.app
   - Sign up with GitHub

2. **Deploy from GitHub**
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository: `NtokozoMahlaela/UnitTesting`

3. **Configure Environment Variables**
   Railway will automatically detect your services and set up:
   - PostgreSQL database
   - Redis cache
   - Spring Boot application

4. **Update Environment Variables**
   Set these in Railway dashboard:
   ```
   SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/railway
   SPRING_DATASOURCE_USERNAME=postgres
   SPRING_DATASOURCE_PASSWORD=your_password
   SPRING_DATA_REDIS_HOST=redis
   SPRING_DATA_REDIS_PORT=6379
   JWT_SECRET=your_jwt_secret_here
   ```

5. **Deploy**
   - Railway will automatically build and deploy
   - You'll get a public URL like: `https://your-app-name.railway.app`

### Benefits:
- ✅ Free tier available
- ✅ Automatic SSL
- ✅ Custom domains
- ✅ Built-in database
- ✅ Easy deployment from GitHub
- ✅ Zero configuration needed

### Your App URL Will Be:
`https://sa-id-validator.up.railway.app`
