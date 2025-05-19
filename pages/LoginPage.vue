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
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #fafafa;
  }
  
  form div {
    margin-bottom: 15px;
  }
  
  input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
  
  button {
    padding: 10px 15px;
    background-color: #2c3e50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>
  
  


   

   
   

   
    
     
     