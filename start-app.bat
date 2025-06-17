@echo off
echo Starting News Aggregator with Enhanced Scraping...

echo Installing backend dependencies...
cd backend
call npm install express axios cheerio cors
echo.

echo Starting Backend Server...
start cmd /k "cd %~dp0backend && node index.js"

echo Starting Frontend...
start cmd /k "cd %~dp0frontend && npx react-scripts start"

echo.
echo News Aggregator started!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit this window...
pause > nul