<template>
  <div>
    <h2>📄 글 작성</h2>
    <input v-model="title" placeholder="제목" />
    <textarea v-model="content" placeholder="내용" />
    <button @click="submitPost">등록</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const title = ref('')
const content = ref('')
const router = useRouter()
const token = localStorage.getItem('token')

const submitPost = async () => {
  await axios.post('http://localhost:8080/api/community/posts', {
    title: title.value,
    content: content.value
  }, {
    headers: { Authorization: `Bearer ${token}` }
  })
  router.push('/community')
//   window.location.reload()
}
</script>

<style scoped>
div {
  max-width: 600px;
  margin: 30px auto;
  padding: 24px;
  background-color: #ffffff;
  border: 1px solid #bbdefb;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(25, 118, 210, 0.06);
  font-family: 'Noto Sans KR', sans-serif;
}

h2 {
  color: #1976d2;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 14px;
  border: 1px solid #90caf9;
  border-radius: 6px;
  font-size: 1rem;
  box-sizing: border-box;
}

textarea {
  min-height: 180px;
  resize: vertical;
}

button {
  width: 100%;
  padding: 10px 16px;
  background-color: #1976d2;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: #1565c0;
}

</style>
