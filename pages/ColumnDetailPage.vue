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
  padding: 24px;
  background-color: #ffffff;
  border-radius: 12px;
  border: 1px solid #bbdefb;
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.06);
  font-family: 'Noto Sans KR', sans-serif;
}

.column-detail h2 {
  color: #1976d2;
  margin-bottom: 12px;
  font-size: 1.6rem;
  font-weight: bold;
}

.meta {
  font-size: 0.95rem;
  color: #9e9e9e;
  margin-bottom: 16px;
}

hr {
  border: none;
  border-top: 1px solid #e3f2fd;
  margin: 20px 0;
}

.content {
  font-size: 1rem;
  color: #333;
  line-height: 1.8;
  white-space: pre-line;
}

</style>