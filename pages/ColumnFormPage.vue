// 🧪 프론트 추가 2: ColumnFormPage.vue (약사만 등록)
<template>
  <div class="column-form">
    <h2>📝 칼럼 등록</h2>
    <input v-model="title" placeholder="제목" />
    <textarea v-model="content" placeholder="내용"></textarea>
    <button @click="submitColumn">등록</button>
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

const submitColumn = async () => {
  try {
    await axios.post('http://localhost:8080/api/columns', {
      title: title.value,
      content: content.value
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    alert('칼럼이 등록되었습니다')
    router.push('/main')
  } catch (e) {
    alert('칼럼 등록 실패')
  }
}
</script>

<style scoped>
.column-form {
  max-width: 600px;
  margin: 0 auto;
}
input, textarea {
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  box-sizing: border-box;
}
</style>