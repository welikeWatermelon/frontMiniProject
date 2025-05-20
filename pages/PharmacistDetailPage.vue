// 🧪 프론트 추가 4: PharmacistDetailPage.vue
<template>
  <div class="pharmacist-columns">
    <h2>📚 칼럼 목록</h2>
    <ul>
      <li v-for="column in columns" :key="column.id" class="column-item">
        <h3>{{ column.title }}</h3>
        <p>{{ column.createdAt.split('T')[0] }}</p>
        <RouterLink :to="`/columns/${column.id}`">전체 보기</RouterLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const pharmacistId = route.params.id
const columns = ref([])

onMounted(async () => {
  const res = await axios.get(`http://localhost:8080/api/columns/pharmacists/${pharmacistId}`)
  columns.value = res.data
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
  background-color: #fefefe;
  border: 1px solid #90caf9;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 16px;
  transition: background-color 0.2s ease;
}

.column-item:hover {
  background-color: #e3f2fd;
}

.column-item h3 {
  margin-bottom: 6px;
  color: #1565c0;
  font-size: 1.1rem;
}

.column-item p {
  margin-bottom: 10px;
  color: #9e9e9e;
  font-size: 0.9rem;
}

.column-item a {
  color: #1976d2;
  font-weight: bold;
  text-decoration: none;
}

.column-item a:hover {
  text-decoration: underline;
}

</style>
