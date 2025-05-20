<template>
    <div class="login-container">
      <h2>🔐 로그인</h2>
      <form @submit.prevent="handleLogin">
        <div>
          <label for="email">이메일</label>
          <input id="email" v-model="email" placeholder="이메일 입력" />
        </div>
        <div>
          <label for="password">비밀번호</label>
          <input id="password" type="password" v-model="password" placeholder="비밀번호 입력" />
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  </template>
  
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const email = ref('')
const password = ref('')
const router = useRouter()

const handleLogin = async () => {
  try {
    const res = await axios.post('http://localhost:8080/users/login', {
      email: email.value,
      password: password.value
    })

    const token = res.data.token
    const userId = res.data.userId // ✅ 백엔드에서 함께 내려줄 것

    // ✅ 로컬에 저장
    localStorage.setItem('token', token)
    localStorage.setItem('userId', userId)

    alert('로그인 성공!')
    router.push('/main')
  } catch (err) {
    console.error(err)
    alert('로그인 실패: ' + (err.response?.data?.message || '서버 오류'))
  }
}
</script>
  
  <style scoped>
.login-container {
  max-width: 400px;
  margin: 60px auto;
  padding: 30px;
  border: 1px solid #bbdefb;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(25, 118, 210, 0.06);
  font-family: 'Noto Sans KR', sans-serif;
}

.login-container h2 {
  text-align: center;
  color: #1976d2;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 24px;
}

form div {
  margin-bottom: 18px;
}

label {
  display: block;
  margin-bottom: 6px;
  color: #1565c0;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #90caf9;
  border-radius: 6px;
  box-sizing: border-box;
  font-size: 1rem;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: #1565c0;
}
  </style>
  
  


   

   
   

   
    
     
     