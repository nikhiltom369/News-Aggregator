@echo off
echo Starting News Aggregator...

echo Starting Backend Server...
start cmd /k "cd backend && npm install && node index.js"

echo Starting Frontend...
start cmd /k "cd frontend && npm install && npx react-scripts start"

echo News Aggregator started!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000