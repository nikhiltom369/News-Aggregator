import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NewsCard from '../components/NewsCard';
import { api } from '../api';

export default function CategoryPage() {
  const { category } = useParams();
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [source, setSource] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [availableSources, setAvailableSources] = useState([]);

  const fetchNews = (selectedSource = '') => {
    setRefreshing(true);
    setError(null);
    
    // Get news from all sources or a specific source for this category
    api.getNewsByCategory(category, selectedSource)
      .then(res => {
        setNewsList(res.data);
        setLoading(false);
        setRefreshing(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load news. Please try again later.');
        setLoading(false);
        setRefreshing(false);
      });
  };

  // Fetch available sources for this category
  const fetchSources = () => {
    api.getSources()
      .then(res => {
        if (res.data && res.data[category]) {
          setAvailableSources(res.data[category]);
        }
      })
      .catch(err => {
        console.error('Failed to fetch sources:', err);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchSources();
    fetchNews();
    
    // Set up auto-refresh every 5 minutes
    const refreshInterval = setInterval(() => fetchNews(source), 5 * 60 * 1000);
    
    // Clean up interval on component unmount
    return () => clearInterval(refreshInterval);
  }, [category]);

  // When source changes, fetch news for that source
  useEffect(() => {
    fetchNews(source);
  }, [source]);

  const handleRefresh = () => {
    fetchNews(source);
  };

  // Get category color for styling
  const getCategoryColor = () => {
    const colors = {
      sports: '#e53935',
      business: '#43a047',
      technology: '#1e88e5',
      india: '#fb8c00',
      world: '#8e24aa',
      entertainment: '#d81b60'
    };
    return colors[category] || '#2a41e8';
  };

  if (loading) return <div className="loading">Loading {category} news</div>;
  if (error) return (
    <div className="error">
      {error}
      <button className="refresh-button" onClick={handleRefresh}>Try Again</button>
    </div>
  );

  return (
    <div>
      <div className="header-with-refresh">
        <h1>{category.charAt(0).toUpperCase() + category.slice(1)} News</h1>
        <div className="header-controls">
          <select 
            className="source-select"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          >
            <option value="">All Sources</option>
            {availableSources.map(src => (
              <option key={src} value={src}>{src}</option>
            ))}
          </select>
          <button 
            className="refresh-button" 
            onClick={handleRefresh} 
            disabled={refreshing}
          >
            {refreshing ? 'Refreshing...' : 'Refresh News'}
          </button>
        </div>
      </div>
      
      <div className={`category-section ${category}`}>
        {newsList.length === 0 ? (
          <p>No {category} news available at the moment.</p>
        ) : (
          <div className="news-grid">
            {newsList.map((news, i) => (
              <NewsCard key={i} news={news} />
            ))}
          </div>
        )}
      </div>
      
      <div className="auto-refresh-notice">
        News automatically refreshes every 5 minutes
      </div>
    </div>
  );
}