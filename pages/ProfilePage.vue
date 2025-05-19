<template>
    <div class="profile-page">
      <h2>🙋‍♂️ 내 프로필</h2>
      <div class="profile-box">
        <p><strong>이메일:</strong> {{ user.email }}</p>
        <p><strong>닉네임:</strong> {{ user.nickname }}</p>
        <p><strong>가입일:</strong> {{ user.joinDate }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  // import axios from 'axios'
  
  const user = ref({ email: '', nickname: '', joinDate: '' })
  
  onMounted(async () => {
    // const res = await axios.get('/api/users/profile')
    // user.value = res.data
    user.value = {
      email: 'user@example.com',
      nickname: '건강왕',
      joinDate: '2024-12-01'
    }
  })
  </script>
  
  <style scoped>
  .profile-page {
    padding: 30px;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .profile-box {
    background-color: #f0f8ff;
    border: 1px solid #aaa;
    padding: 20px;
    border-radius: 10px;
  }
  
  .profile-box p {
    margin: 10px 0;
  }
  </style>