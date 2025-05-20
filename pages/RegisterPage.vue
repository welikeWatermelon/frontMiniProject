<template>
  <div class="register-container">
    <h2>📝 회원가입</h2>
    <form @submit.prevent="handleRegister">
      <div>
        <label for="name">이름</label>
        <input id="name" v-model="name" placeholder="이름 입력" />
      </div>
      <div>
        <label for="email">이메일</label>
        <input id="email" v-model="email" placeholder="이메일 입력" />
      </div>
      <div>
        <label for="password">비밀번호</label>
        <input id="password" type="password" v-model="password" placeholder="비밀번호 입력" />
      </div>
      <div>
        <label for="birthDate">생년월일</label>
        <input id="birthDate" type="date" v-model="birthDate" />
      </div>
      <div>
        <label for="gender">성별</label>
        <select id="gender" v-model="gender">
          <option value="MALE">남성</option>
          <option value="FEMALE">여성</option>
        </select>
      </div>
      <div>
        <label for="nickname">닉네임</label>
        <input id="nickname" v-model="nickname" placeholder="닉네임 입력" />
      </div>
      <div>
        <label for="profileImage">프로필 이미지 URL</label>
        <input id="profileImage" v-model="profileImage" placeholder="http://..." />
      </div>
      <div>
        <label for="role">역할</label>
        <select id="role" v-model="role">
          <option value="USER">일반 사용자</option>
          <option value="PHARMACIST">약사</option>
        </select>
      </div>
      <div v-if="role === 'PHARMACIST'">
        <label for="licenseNumber">면허번호</label>
        <input id="licenseNumber" v-model="licenseNumber" placeholder="면허번호 입력" />
        <label for="hospitalName">병원 이름</label>
        <input id="hospitalName" v-model="hospitalName" placeholder="병원 이름 입력" />
      </div>
      <button type="submit">가입하기</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const name = ref('')
const email = ref('')
const password = ref('')
const birthDate = ref('')
const gender = ref('MALE')
const nickname = ref('')
const profileImage = ref('')
const role = ref('USER')
const licenseNumber = ref('')
const hospitalName = ref('')

const router = useRouter()

const handleRegister = async () => {
  try {
    const data = {
      name: name.value,
      email: email.value,
      password: password.value,
      birthDate: birthDate.value,
      gender: gender.value,
      nickname: nickname.value,
      profileImage: profileImage.value,
      role: role.value,
      licenseNumber: role.value === 'PHARMACIST' ? licenseNumber.value : null,
      hospitalName: role.value === 'PHARMACIST' ? hospitalName.value : null
    }

    await axios.post('http://localhost:8080/users/register', data)
    alert('회원가입 성공!')
    router.push('/login')
  } catch (error) {
    console.error(error)
    alert('회원가입 실패')
  }
}
</script>

<style scoped>
.register-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 30px;
  background-color: #ffffff;
  border: 1px solid #bbdefb;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(25, 118, 210, 0.05);
  font-family: 'Noto Sans KR', sans-serif;
}

.register-container h2 {
  text-align: center;
  color: #1976d2;
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 24px;
}

form div {
  margin-bottom: 18px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
  color: #1565c0;
}

input,
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #90caf9;
  border-radius: 6px;
  box-sizing: border-box;
  font-size: 1rem;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #1976d2;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: #1565c0;
}

</style>
