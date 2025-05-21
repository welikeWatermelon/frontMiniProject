<template>
  <div class="profile-page">
    <h2>👤 나의 프로필</h2>
    <div class="profile-box" v-if="profile">
      <img :src="profile.profileImage" alt="프로필 이미지" class="profile-img" />
      <p><strong>이름:</strong> {{ profile.name }}</p>
      <p><strong>닉네임:</strong> {{ profile.nickname }}</p>
      <p><strong>이메일:</strong> {{ profile.email }}</p>
      <p><strong>생년월일:</strong> {{ profile.birthDate }}</p>
      <p><strong>성별:</strong> {{ profile.gender }}</p>
    </div>
    <div v-else class="loading">프로필 정보를 불러오는 중...</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const profile = ref(null)
const token = localStorage.getItem('token')
const userId = localStorage.getItem('userId')

onMounted(async () => {
  try {
    const res = await axios.get(`http://localhost:8080/users/profile`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { userId }
    })
    profile.value = res.data
  } catch (err) {
    console.error('프로필 정보 불러오기 실패:', err)
  }
})
</script>

<style scoped>
.profile-page {
  max-width: 600px;
  margin: 40px auto;
  padding: 24px;
  background-color: #ffffff;
  border: 1px solid #bbdefb;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(25, 118, 210, 0.06);
  font-family: 'Noto Sans KR', sans-serif;
}

h2 {
  color: #1976d2;
  margin-bottom: 20px;
  text-align: center;
}

.profile-box p {
  font-size: 1rem;
  margin-bottom: 10px;
  color: #333;
}

.profile-img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
  border: 2px solid #90caf9;
}

.loading {
  text-align: center;
  color: #999;
}
</style>