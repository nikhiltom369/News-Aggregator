import React from 'react';

export default function NewsCard({ news }) {
  // Get source badge color based on source name
  const getSourceColor = (source) => {
    // Generate a consistent color based on the source name
    const hash = source.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    
    const h = Math.abs(hash) % 360;
    return `hsl(${h}, 70%, 40%)`; // HSL color with consistent hue
  };

  // Format the published date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Handle image error
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.style.display = 'none';
  };

  return (
    <div className="news-card">
      <div className="news-card-inner">
        {news.imageUrl && (
          <div className="news-image">
            <img 
              src={news.imageUrl} 
              alt={news.title} 
              onError={handleImageError}
            />
            <div className="news-overlay"></div>
          </div>
        )}
        <div className="news-content">
          <h2>{news.title}</h2>
          {news.description && (
            <p className="news-description">{news.description}</p>
          )}
          <div className="news-meta">
            {news.source && (
              <span 
                className="source-badge" 
                style={{ backgroundColor: getSourceColor(news.source) }}
              >
                {news.source}
              </span>
            )}
            {news.publishedAt && (
              <span className="publish-date">{formatDate(news.publishedAt)}</span>
            )}
            <a 
              href={news.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="read-more"
            >
              Read more
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}