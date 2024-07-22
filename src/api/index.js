import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api', // 使用代理前缀
  headers: {
    'Content-Type': 'application/json',
  },
});

function getHistory(type) {
  return apiClient.get('/creation/comfy/history', {
    params: { type },
  });
}

function submitTxt2Image(data) {
  return apiClient.post('/creation/comfy/submit/txt2Image', data);
}

function uploadImage(data) {
  // 直接使用新的 axios 实例，以便覆盖 Content-Type 头
  const formDataClient = axios.create({
    baseURL: '/api',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return formDataClient.post('/creation/comfy/upload', data);
}

function submitEchoMimia(data) {
  return apiClient.post('/creation/comfy/submit/echoMimia', data);
}

export default {
  getHistory,
  submitTxt2Image,
  uploadImage,
  submitEchoMimia,
};
