import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext';
import { api } from '../api';

export default function Navbar() {
  const [categories, setCategories] = useState(['sports', 'business', 'technology', 'india']);
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  useEffect(() => {
    // Fetch available categories from the backend
    api.getCategories()
      .then(res => {
        if (res.data && res.data.length > 0) {
          setCategories(res.data);
        }
      })
      .catch(err => {
        console.error('Failed to fetch categories:', err);
      });
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/">Home</Link>
        {categories.map(category => (
          <Link key={category} to={`/category/${category}`}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Link>
        ))}
      </div>
      <button 
        className="theme-toggle" 
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </nav>
  );
}