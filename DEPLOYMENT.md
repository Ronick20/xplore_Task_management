# Deployment Guide

## Important: Current Setup Uses MongoDB Atlas

This application is **already configured to use MongoDB Atlas** (cloud database):

- **Cluster**: cluster0.lheagvk.mongodb.net
- **Database**: task-management
- **Configuration**: Stored in `backend/.env` file with `MONGODB_URI` environment variable

When deploying, you'll need to ensure the MongoDB Atlas connection string is available to your production environment.

---

## Deployment Options

### Option 1: Heroku Deployment

#### Prerequisites

- Heroku account
- Heroku CLI installed
- Git installed
- **MongoDB Atlas account** ✅ (already set up)

#### Step 1: Prepare Project

1. Create `Procfile` in backend root:

```
web: npm start
```

2. Update `backend/package.json` - add start script:

```json
"scripts": {
  "start": "node server.js"
}
```

3. Add `backend/server.js` PORT handling:

```javascript
const PORT = process.env.PORT || 5000;
```

---

#### Step 2: Setup MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Create cluster
3. Add IP whitelist (0.0.0.0/0 for development)
4. Create database user
5. Get connection string:

```
mongodb+srv://username:password@cluster.mongodb.net/task-management?retryWrites=true&w=majority
```

---

#### Step 3: Create Heroku Apps

```bash
# Create backend app
heroku create your-app-name-backend

# Create frontend app
heroku create your-app-name-frontend

# Login to Heroku
heroku login
```

---

#### Step 4: Deploy Backend

```bash
cd backend

# Set environment variables
heroku config:set MONGODB_URI=mongodb+srv://... --app your-app-name-backend
heroku config:set JWT_SECRET=your_super_secret_key --app your-app-name-backend
heroku config:set NODE_ENV=production --app your-app-name-backend

# Push to Heroku
git push heroku main
```

---

#### Step 5: Deploy Frontend

```bash
cd frontend

# Create `.env` for production
echo "REACT_APP_API_URL=https://your-app-name-backend.herokuapp.com/api" > .env.production

# Build
npm run build

# Push to Heroku
git push heroku main
```

---

### Option 2: Vercel (Frontend Only)

#### For Frontend:

```bash
# Install Vercel CLI
npm i -g vercel

cd frontend

# Deploy
vercel

# Add environment variable
vercel env add REACT_APP_API_URL
# Enter: https://your-backend.herokuapp.com/api
```

---

### Option 3: AWS Deployment

#### Backend to AWS EC2:

1. Launch EC2 instance (Ubuntu)
2. Install Node.js and MongoDB:

```bash
# Install Node.js
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.39.0/install.sh | bash
nvm install 16

# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb

# Start MongoDB
sudo systemctl start mongodb
```

3. Deploy application:

```bash
# Clone repository
git clone your-repo-url

# Install dependencies
cd backend
npm install

# Create .env file
sudo nano .env

# Start with PM2
npm install -g pm2
pm2 start server.js --name "task-api"
pm2 startup
pm2 save
```

---

### Option 4: Docker Deployment

#### Create `backend/Dockerfile`:

```dockerfile
FROM node:16

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

#### Create `docker-compose.yml`:

```yaml
version: "3.8"

services:
  mongodb:
    image: mongo:5
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: password
    volumes:
      - mongo_data:/data/db

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      MONGODB_URI: mongodb://root:password@mongodb:27017/task-management?authSource=admin
      JWT_SECRET: your_jwt_secret
    depends_on:
      - mongodb

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      REACT_APP_API_URL: http://localhost:5000/api

volumes:
  mongo_data:
```

#### Build and Run:

```bash
docker-compose up --build
```

---

## Pre-Deployment Checklist

- [ ] Change default admin credentials
- [ ] Update JWT_SECRET to strong value
- [ ] Setup MongoDB Atlas or production database
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS
- [ ] Add rate limiting
- [ ] Setup environment variables
- [ ] Test all API endpoints
- [ ] Test authentication flows
- [ ] Test with production database
- [ ] Setup error logging
- [ ] Configure CORS properly
- [ ] Test email notifications (if any)
- [ ] Setup monitoring and alerts
- [ ] Prepare rollback plan

---

## Production Environment Variables

```
# Backend .env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/task-management
JWT_SECRET=use_a_cryptographically_secure_random_string
PORT=5000

# Frontend .env.production
REACT_APP_API_URL=https://your-production-api.com/api
```

---

## Performance Optimization

### Backend:

```javascript
// Add compression
const compression = require("compression");
app.use(compression());

// Add helmet for security
const helmet = require("helmet");
app.use(helmet());

// Rate limiting
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);
```

### Frontend:

```bash
# Create optimized build
npm run build

# Bundle analysis
npm i --save-dev source-map-explorer
npm run build
npx source-map-explorer 'build/static/js/*'
```

---

## SSL Certificate Setup

### Using Let's Encrypt (Free):

```bash
sudo apt-get install certbot python3-certbot-nginx

sudo certbot certonly --standalone -d your-domain.com

# Update Nginx to use certificate
sudo nano /etc/nginx/sites-available/default
```

### Certificate renewal:

```bash
sudo certbot renew --dry-run
```

---

## Monitoring & Logging

### Setup PM2 Monitoring:

```bash
npm install -g pm2-monitoring

pm2 link <secret_key> <public_key>
pm2 plus
```

### Application Logging:

```bash
npm install winston

# In server.js
const logger = require('./logger');
logger.info('Application started');
```

---

## Database Backup Strategy

### MongoDB Atlas Backup:

1. Enable automatic backups in MongoDB Atlas
2. Schedule: Weekly
3. Retention: 30 days

### Manual Backup:

```bash
mongodump --uri "mongodb+srv://user:pass@cluster.mongodb.net/task-management"

mongorestore --uri "mongodb+srv://..." dump/
```

---

## CI/CD Pipeline (GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Use Node.js
        uses: actions/setup-node@v2
        with:
          node-version: "16"

      - name: Install and Test Backend
        run: |
          cd backend
          npm install
          npm test

      - name: Deploy Backend
        run: |
          cd backend
          git push heroku main
        env:
          HEROKU_API_KEY: ${{ secrets.HEROKU_API_KEY }}
```

---

## Post-Deployment

1. **Monitor Performance:**
   - Check response times
   - Monitor server resources
   - Track error rates

2. **Setup Alerts:**
   - Database connection errors
   - High memory usage
   - API response time > threshold

3. **Regular Maintenance:**
   - Update dependencies monthly
   - Rotate JWT secrets
   - Review and clean logs
   - Monitor database size

---

## Rollback Plan

If deployment fails:

```bash
# Heroku rollback
heroku releases
heroku rollback v2

# Git rollback
git revert HEAD
git push heroku main
```

---

## Cost Estimation (Monthly)

| Service           | Cost      | Notes                    |
| ----------------- | --------- | ------------------------ |
| MongoDB Atlas     | $57       | M10 cluster, 2GB storage |
| Heroku (Backend)  | $50       | Hobby dyno               |
| Vercel (Frontend) | Free      | Free tier sufficient     |
| Domain            | $12       | .com domain              |
| **Total**         | **~$119** | Minimal setup            |

---

## Security Checklist

- [ ] HTTPS enabled
- [ ] Strong JWT secret
- [ ] SQL injection protection
- [ ] CSRF protection
- [ ] Rate limiting enabled
- [ ] Input validation
- [ ] Output encoding
- [ ] Secure headers set
- [ ] CORS properly configured
- [ ] No secrets in code
- [ ] Environment variables used
- [ ] Regular security updates

---

## Support & Help

- Heroku Docs: https://devcenter.heroku.com/
- AWS EC2: https://docs.aws.amazon.com/ec2/
- MongoDB Atlas: https://docs.atlas.mongodb.com/
- Docker: https://docs.docker.com/

---

Last Updated: 2024-04-06
