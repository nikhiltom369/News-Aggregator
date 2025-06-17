# News Aggregator

A React-based news aggregator that scrapes news from different websites and categorizes them.

## Project Structure

```
news-aggregator/
├── backend/             # Node.js + Express backend
│   ├── index.js         # Server with scraping logic
│   └── package.json     # Backend dependencies
└── frontend/            # React frontend
    ├── public/          # Static files
    │   └── index.html   # HTML template
    ├── src/             # React source code
    │   ├── components/  # Reusable components
    │   │   ├── Navbar.js
    │   │   └── NewsCard.js
    │   ├── pages/       # Page components
    │   │   ├── CategoryPage.js
    │   │   └── Home.js
    │   ├── App.js       # Main App component
    │   ├── index.css    # Global styles
    │   └── index.js     # React entry point
    └── package.json     # Frontend dependencies
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the backend server:
   ```
   npm start
   ```
   The server will run on http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the React development server:
   ```
   npm start
   ```
   The application will open in your browser at http://localhost:3000

## Features

- Scrapes news from multiple sources (NDTV, BBC)
- Categorizes news (Sports, Finance, Technology)
- Responsive design
- Real-time news updates

## Notes

- This application is for educational purposes only
- Be mindful of the websites' terms of service when scraping content
- Consider implementing rate limiting to avoid overloading the news websites