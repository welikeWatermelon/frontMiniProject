// 🧪 프론트 추가 5: ColumnDetailPage.vue
<template>
  <div class="column-detail">
    <h2>{{ column.title }}</h2>
    <p class="meta">👨‍⚕️ 작성자: {{ column.pharmacistName }} | 📅 {{ formatDate(column.createdAt) }}</p>
    <hr />
    <p class="content">{{ column.content }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const column = ref({})
const route = useRoute()
const columnId = route.params.id

onMounted(async () => {
  const res = await axios.get(`http://localhost:8080/api/columns/${columnId}`)
  column.value = res.data
})

const formatDate = (dt) => new Date(dt).toLocaleDateString()
</script>

<style scoped>
.column-detail {
  max-width: 700px;
  margin: 30px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #ddd;
}
.meta {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 10px;
}
.content {
  font-size: 1rem;
  line-height: 1.6;
}
</style>