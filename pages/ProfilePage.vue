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
  max-width: 600px;
  margin: 40px auto;
  padding: 30px;
  background-color: #ffffff;
  border: 1px solid #bbdefb;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(25, 118, 210, 0.06);
  font-family: 'Noto Sans KR', sans-serif;
}

.profile-page h2 {
  text-align: center;
  color: #1976d2;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 24px;
}

.profile-box {
  background-color: #e3f2fd;
  border: 1px solid #90caf9;
  padding: 24px;
  border-radius: 10px;
}

.profile-box p {
  margin: 12px 0;
  font-size: 1rem;
  color: #333;
}

.profile-box strong {
  color: #1565c0;
  display: inline-block;
  width: 80px;
}

  </style>