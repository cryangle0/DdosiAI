<!-- Header.vue -->
<template>
  <header class="header">
    <div class="logo" @click="navigateToIndex">
      <img src="@/assets/iconimgs/logo.png" alt="logo" />
      <span>幻影</span>
    </div>
    <div class="user-profile" @click="openLoginModal">
      <img src="@/assets/iconimgs/logo.png" alt="user icon" />
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const emit = defineEmits(['open-login']);

const navigateToIndex = () => {
  router.push('/home');
};

const openLoginModal = () => {
  emit('open-login');
};
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
  background-color: rgba(33, 33, 33, 0.5); /* 半透明的#212121背景色 */
  padding: 10px 20px;
  z-index: 1000;
  box-sizing: border-box;
}

.logo {
  cursor: pointer;
  display: flex;
  align-items: center;

  img {
    height: 60px; /* 图标高度放大一倍 */
    margin-right: 20px; /* 间距相应放大 */
  }

  span {
    color: white;
    font-size: 36px; /* 文字大小放大一倍 */
  }
}

.user-profile {
  cursor: pointer;

  img {
    height: 60px; /* 图标高度放大一倍 */
    width: 60px; /* 图标宽度放大一倍 */
    border-radius: 50%;
  }
}
</style>
