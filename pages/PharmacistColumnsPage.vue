<!-- src/pages/PharmacistColumnPage.vue -->
<template>
  <div class="pharmacist-columns">
    <h2>📚 {{ pharmacistName }} 약사의 칼럼 목록</h2>

    <ul v-if="columns.length > 0">
      <li v-for="column in columns" :key="column.id" class="column-item">
        <h3>
          <RouterLink :to="`/columns/${column.id}`" class="column-title-link">
            {{ column.title }}
          </RouterLink>
        </h3>
      </li>
    </ul>

    <p v-else class="no-columns">작성한 칼럼이 없습니다.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const columns = ref([])
const pharmacistName = ref('')
const token = localStorage.getItem('token')

const route = useRoute()
const pharmacistId = route.params.id  // /follows/pharmacist/:id 경로에서 추출

onMounted(async () => {
  try {
    const res = await axios.post('http://localhost:8080/api/follows/pharmacist', {
      pharmacistId
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })

    pharmacistName.value = res.data.pharmacistName
    columns.value = res.data.columns
  } catch (err) {
    console.error('칼럼 목록 조회 실패:', err)
  }
})
</script>

<style scoped>
.pharmacist-columns {
  max-width: 800px;
  margin: 30px auto;
  padding: 24px;
  background-color: #ffffff;
  border: 1px solid #bbdefb;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(25, 118, 210, 0.06);
  font-family: 'Noto Sans KR', sans-serif;
}

.pharmacist-columns h2 {
  text-align: center;
  color: #1976d2;
  margin-bottom: 24px;
  font-size: 1.5rem;
  font-weight: bold;
}

.column-item {
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f5faff;
  border: 1px solid #90caf9;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.column-item:hover {
  background-color: #e3f2fd;
}

.column-item a {
  text-decoration: none;
  color: #1565c0;
  font-weight: 500;
  font-size: 1.1rem;
}

.column-item a:hover {
  text-decoration: underline;
}

.no-columns {
  text-align: center;
  color: #888;
  font-size: 1rem;
}

.column-title-link {
  text-decoration: none;
  color: #1565c0;
  font-weight: 500;
  font-size: 1.1rem;
}

.column-title-link:hover {
  text-decoration: underline;
  color: #0d47a1;
}
</style>
