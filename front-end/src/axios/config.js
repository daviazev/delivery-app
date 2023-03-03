const { default: axios } = require('axios');

export default axios.create({ baseURL: 'http://localhost:3001' });

export const setToken = (token) => {
  axios.defaults.headers.common.Authorization = token;
};
