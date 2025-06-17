import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

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