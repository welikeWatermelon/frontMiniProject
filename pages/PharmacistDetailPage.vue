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
.column-item {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
}
</style>
