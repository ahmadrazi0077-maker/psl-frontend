import api from './api';

export const fetchNews = async (category = 'all') => {
  try {
    const response = await api.get('/news');
    return response.data;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};