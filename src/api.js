import axios from 'axios';

// Use the environment variable or fallback to the Railway URL
const API_URL = process.env.REACT_APP_API_URL || 'https://backendnews-production-0bc6.up.railway.app';

export const api = {
  getCategories: () => axios.get(`${API_URL}/categories`),
  getSources: () => axios.get(`${API_URL}/sources`),
  getNewsByCategory: (category, source = '') => {
    const sourceParam = source ? `?source=${encodeURIComponent(source)}` : '';
    return axios.get(`${API_URL}/all-news/${category}${sourceParam}`);
  },
  getAllCategoriesNews: (source = '') => {
    const sourceParam = source ? `?source=${encodeURIComponent(source)}` : '';
    return axios.get(`${API_URL}/all-categories-news${sourceParam}`);
  }
};
