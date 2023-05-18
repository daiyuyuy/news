import axios from 'axios';
import store from '../../store';

// axios.defaults.baseURL = 'http://localhost:8080';
// axios.defaults.timeout = 1000 * 10;
const http=axios.create({
    baseURL :'http://localhost:8080',
    timeout:3000
})

http.interceptors.request.use(config => {
  const { loginReducer } = store.getState();
  if (loginReducer && loginReducer.token) {
    config.headers['Authorization'] = loginReducer.token;
  }
  return config;
});

http.interceptors.response.use(res => {
  if (res.status === 200) {
    return res.data;
  }
});

// export default http
export function request(method, url, plyload) {
  return http.request({ method, url, ...plyload });
}