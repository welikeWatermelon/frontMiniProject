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
.all-columns {
  padding: 20px;
  background-color: #ffffff;
}

.all-columns h2 {
  color: #1976d2;
  margin-bottom: 20px;
}

.all-columns ul {
  list-style: none;
  padding: 0;
}

.column-item {
  border: 1px solid #bbdefb;
  background-color: #fefefe;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 6px rgba(25, 118, 210, 0.06);
}

.column-item h3 {
  color: #1565c0;
  font-size: 1.1rem;
  margin-bottom: 8px;
}

.column-item p {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 6px;
}

.author-follow {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 8px 0;
  font-size: 0.95rem;
  color: #1976d2;
}

.author-follow button {
  background-color: #1976d2;
  color: #fff;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.author-follow button:hover {
  background-color: #1565c0;
}

.column-item a {
  display: inline-block;
  margin-top: 8px;
  color: #1565c0;
  text-decoration: none;
  font-weight: 500;
}

.column-item a:hover {
  text-decoration: underline;
}

</style>
