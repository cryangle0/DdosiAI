import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // 使用环境变量
  headers: {
    'Content-Type': 'application/json',
  },
});

function getHistory(type) {
  return apiClient.get('/creation/work', {
    params: { type },
  });
}

function submitTxt2Image(data) {
  return apiClient.post('/creation/submit/txt2Image', data);
}

function uploadImage(data) {
  // 直接使用新的 axios 实例，以便覆盖 Content-Type 头
  const formDataClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return formDataClient.post('/file/upload', data);
}

function submitEchoMimia(data) {
  return apiClient.post('/creation/submit/echoMimia', data);
}

// 用户登录
function userLogin(data) {
  return apiClient.post('/auth/user/login', data);
}

// 用户注册
function userRigester(data) {
  return apiClient.post('/auth/user/register', data);
}

// 修改资料
function userEdit(data) {
  return apiClient.put('/auth/user/userInfo', data);
}

//邮箱验证
function sendEmail(data) {
  return apiClient.post('/auth/user/sendEmail', data);
}

export default {
  getHistory,
  submitTxt2Image,
  uploadImage,
  submitEchoMimia,
  userLogin,
  userRigester,
  userEdit,
  sendEmail
};
