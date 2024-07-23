<template>
  <header class="header">
    <div class="logo" @click="navigateToIndex">
      <img src="@/assets/iconimgs/logo.png" alt="logo" />
      <span>幻影</span>
    </div>
    <div class="user-profile" @click="handleUserProfileClick">
      <template v-if="isLoggedIn && user.avatar">
        <img :src="user.avatar" alt="user icon" />
      </template>
      <template v-else>
        <img src="@/assets/iconimgs/logo.png" alt="default icon" />
      </template>
      <div v-if="showDropdown" class="dropdown">
        <div class="dropdown-item" @click="navigateToProfile">个人中心</div>
        <div class="dropdown-item" @click="navigateToOrders">我的订单</div>
        <div class="dropdown-item" @click="navigateToWallet">我的钱包</div>
        <div class="dropdown-item" @click="logout">退出</div>
      </div>
    </div>
    <LoginModal :visible="showLoginModal" @close="showLoginModal = false" @login-success="handleLoginSuccess" />
  </header>
</template>

<script setup>
import { ref, computed, getCurrentInstance, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import LoginModal from './LoginModal.vue';

const { proxy } = getCurrentInstance();

const router = useRouter();
const emit = defineEmits(['open-login']);
const user = ref({
  avatar: null,
  username: '幻风'
});

const showDropdown = ref(false);
const showLoginModal = ref(false);
const isLoggedIn = ref(false);

const handleUserProfileClick = async () => {
  if (isLoggedIn.value) {
    toggleDropdown();
  } else {
    showLoginModal.value = true;
  }
};

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const fetchUserInfo = async () => {
  try {
    const response = await proxy.$api.getUserInfo();
    if (response.data.code === 200) {
      user.value = response.data.data;
      isLoggedIn.value = true;
    } else {
      message.error(response.data.message || '获取用户信息失败');
    }
  } catch (error) {
    console.error('获取用户信息失败:', error);
    message.error('获取用户信息失败');
  }
};

const checkLoginStatus = () => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    isLoggedIn.value = true;
    fetchUserInfo();
  } else {
    isLoggedIn.value = false;
  }
};

const navigateToIndex = () => {
  router.push('/home');
};

const navigateToProfile = () => {
  router.push('/profile');
};

const navigateToOrders = () => {
  router.push('/orders');
};

const navigateToWallet = () => {
  router.push('/wallet');
};

const logout = () => {
  localStorage.removeItem('accessToken');
  user.value = {
    avatar: null,
    username: '用户'
  };
  isLoggedIn.value = false;
  message.success('退出成功');
  showDropdown.value = false;
};

const handleLoginSuccess = (userInfo) => {
  showLoginModal.value = false;
  user.value = {
    avatar: userInfo.avatar,
    username: userInfo.username
  };
  isLoggedIn.value = true;
};

const truncatedUsername = computed(() => {
  if (user.value.username.length > 3) {
    return user.value.username.slice(0, 3) + '...';
  }
  return user.value.username;
});

onMounted(() => {
  checkLoginStatus();
});
</script>

<style scoped lang="less">
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(33, 33, 33, 0.5);
  padding: 10px 20px;
  z-index: 1000;
  box-sizing: border-box;
}

.logo {
  cursor: pointer;
  display: flex;
  align-items: center;

  img {
    height: 60px;
    margin-right: 20px;
  }

  span {
    color: white;
    font-size: 36px;
  }
}

.user-profile {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;

  img {
    height: 60px;
    width: 60px;
    border-radius: 50%;
  }

  .avatar-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    background-color: #e96332;
    color: white;
    font-size: 20px;
    font-weight: bold;
    text-transform: uppercase;
  }
}

.dropdown {
  position: absolute;
  top: 70px;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: 200px;
}

.dropdown-item {
  padding: 10px;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s;
}

.dropdown-item:hover {
  background-color: #f0f0f0;
}
</style>
