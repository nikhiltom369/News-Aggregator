# Deploying the News Aggregator

## Deploying the Frontend to Vercel

1. Create a Vercel account at https://vercel.com if you don't have one
2. Install the Vercel CLI:
   ```
   npm install -g vercel
   ```
3. Login to Vercel:
   ```
   vercel login
   ```
4. Navigate to the project root directory and deploy:
   ```
   cd news-aggregator
   vercel
   ```
5. Follow the prompts. When asked about the build settings:
   - Build Command: `npm run build`
   - Output Directory: `frontend/build`
   - Development Command: `npm start`

6. After deployment, go to the Vercel dashboard, find your project, and add the following environment variable:
   - Name: `REACT_APP_API_URL`
   - Value: Your backend API URL (see below for backend deployment options)

7. Redeploy with the environment variable:
   ```
   vercel --prod
   ```

## Deploying the Backend

Since Vercel is primarily for frontend hosting, you'll need to deploy the backend separately. Here are some options:

### Option 1: Deploy to Render.com

1. Create a Render account at https://render.com
2. Create a new Web Service
3. Connect your GitHub repository or upload the backend code
4. Configure the service:
   - Build Command: `npm install`
   - Start Command: `node index.js`
   - Add environment variables if needed

### Option 2: Deploy to Heroku

1. Create a Heroku account at https://heroku.com
2. Install the Heroku CLI and login
3. Create a new Heroku app and deploy the backend:
   ```
   cd backend
   heroku create your-news-api
   git init
   git add .
   git commit -m "Initial commit"
   git push heroku master
   ```

### Option 3: Deploy to Railway.app

1. Create a Railway account at https://railway.app
2. Create a new project
3. Deploy from GitHub or upload the backend code
4. Configure the service with the start command: `node index.js`

## After Backend Deployment

Once your backend is deployed, update the frontend environment variable `REACT_APP_API_URL` in the Vercel dashboard to point to your backend URL.

For example:
```
REACT_APP_API_URL=https://your-news-api.herokuapp.com
```

Then redeploy the frontend:
```
vercel --prod
```