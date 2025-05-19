// 🧪 프론트 추가 6: AllColumnsPage.vue
<template>
  <div class="all-columns">
    <h2>📚 전체 칼럼</h2>
    <ul>
      <li v-for="column in columns" :key="column.id" class="column-item">
        <h3>{{ column.title }}</h3>
        <p>{{ column.createdAt.split('T')[0] }}</p>
        <div class="author-follow">
          👨‍⚕️ {{ column.pharmacistName }}
          <button @click="follow(column.pharmacistId)">+ 팔로우</button>
        </div>
        <RouterLink :to="`/columns/${column.id}`">🔍 전체 보기</RouterLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const columns = ref([])
const token = localStorage.getItem('token')

onMounted(async () => {
  const res = await axios.get('http://localhost:8080/api/columns/all', {
    headers: { Authorization: `Bearer ${token}` }
  })
  columns.value = res.data
})

const follow = async (pharmacistId) => {
  await axios.post('http://localhost:8080/api/follows', {
    pharmacistId
  }, {
    headers: { Authorization: `Bearer ${token}` }
  })
  alert('팔로우 완료')
}
</script>

<style scoped>
.all-columns ul {
  list-style: none;
  padding: 0;
}
.column-item {
  border: 1px solid #ddd;
  padding: 12px;
  margin-bottom: 16px;
  border-radius: 8px;
}
.author-follow {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 6px 0;
}
</style>
