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
