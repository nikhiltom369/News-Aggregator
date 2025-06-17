import React, { useEffect, useState } from 'react';
import NewsCard from '../components/NewsCard';
import { api } from '../api';

export default function Home() {
  const [allCategoriesNews, setAllCategoriesNews] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [allSources, setAllSources] = useState({});
  const [selectedSource, setSelectedSource] = useState('');

  const fetchAllNews = (source = '') => {
    setRefreshing(true);
    
    // First get all available categories
    api.getCategories()
      .then(res => {
        setCategories(res.data);
        
        // Then fetch news for all categories
        return api.getAllCategoriesNews(source);
      })
      .then(res => {
        setAllCategoriesNews(res.data);
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

  // Fetch all available sources
  const fetchSources = () => {
    api.getSources()
      .then(res => {
        setAllSources(res.data);
      })
      .catch(err => {
        console.error('Failed to fetch sources:', err);
      });
  };

  useEffect(() => {
    fetchSources();
    fetchAllNews();
    
    // Set up auto-refresh every 5 minutes
    const refreshInterval = setInterval(() => fetchAllNews(selectedSource), 5 * 60 * 1000);
    
    // Clean up interval on component unmount
    return () => clearInterval(refreshInterval);
  }, []);

  // When source changes, fetch news for that source
  useEffect(() => {
    if (selectedSource) {
      fetchAllNews(selectedSource);
    } else {
      fetchAllNews();
    }
  }, [selectedSource]);

  const handleRefresh = () => {
    fetchAllNews(selectedSource);
  };

  // Get all unique sources across all categories
  const getAllUniqueSources = () => {
    const sourcesSet = new Set();
    
    Object.values(allSources).forEach(categorySources => {
      categorySources.forEach(source => sourcesSet.add(source));
    });
    
    return Array.from(sourcesSet).sort();
  };

  // Get category color for styling
  const getCategoryColor = (category) => {
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

  if (loading) return <div className="loading">Loading all news categories</div>;
  if (error) return (
    <div className="error">
      {error}
      <button className="refresh-button" onClick={handleRefresh}>Try Again</button>
    </div>
  );

  return (
    <div>
      <div className="header-with-refresh">
        <h1>Global News Digest</h1>
        <div className="header-controls">
          <select 
            className="source-select"
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
          >
            <option value="">All Sources</option>
            {getAllUniqueSources().map(source => (
              <option key={source} value={source}>{source}</option>
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
      
      {categories.map(category => (
        <div 
          key={category} 
          className={`category-section ${category}`}
          style={{ 
            '--category-color': getCategoryColor(category) 
          }}
        >
          <h2 className="category-title">{category.charAt(0).toUpperCase() + category.slice(1)} News</h2>
          
          {allCategoriesNews[category] && allCategoriesNews[category].length > 0 ? (
            <div className="news-grid">
              {allCategoriesNews[category].map((news, i) => (
                <NewsCard key={`${category}-${i}`} news={news} />
              ))}
            </div>
          ) : (
            <p>No {category} news available at the moment.</p>
          )}
        </div>
      ))}
      
      <div className="auto-refresh-notice">
        News automatically refreshes every 5 minutes
      </div>
    </div>
  );
}