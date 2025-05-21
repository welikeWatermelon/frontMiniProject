// 🧪 프론트 추가 3: MyFollowListPage.vue
<template>
  <div class="followed-list">
    <h2>❤️ 내가 팔로우한 약사</h2>
    <ul>
      <li v-for="f in follows" :key="f.pharmacistId" class="card">
        <img :src="f.profileImage" alt="profile" />
        <div class="info">
          <h3>{{ f.name }}</h3>
          <RouterLink :to="`/pharmacists/${f.pharmacistId}`">📘</RouterLink>
          <p> 타이틀 : {{ f.email }}  약사 ID :  {{ f.pharmacistId }}</p>
          <RouterLink :to="`/pharmacists/${f.pharmacistId}`">
            <button>칼럼 보기</button>
          </RouterLink>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const follows = ref([])
const token = localStorage.getItem('token')


onMounted(async () => {
  const res = await axios.get('http://localhost:8080/api/follows/my', {
    headers: { Authorization: `Bearer ${token}` }
  })

  console.log('팔로우 데이터 : ', res.data)
  follows.value = res.data
})
</script>

<style scoped>
.followed-list {
  max-width: 800px;
  margin: 30px auto;
  padding: 24px;
  background-color: #ffffff;
  border: 1px solid #bbdefb;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(25, 118, 210, 0.06);
  font-family: 'Noto Sans KR', sans-serif;
}

.followed-list h2 {
  text-align: center;
  color: #1976d2;
  margin-bottom: 24px;
  font-size: 1.5rem;
  font-weight: bold;
}

.followed-list ul {
  list-style: none;
  padding: 0;
}

.card {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  padding: 16px;
  background-color: #fefefe;
  border: 1px solid #90caf9;
  border-radius: 10px;
  align-items: center;
  box-shadow: 0 1px 4px rgba(25, 118, 210, 0.03);
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-3px);
  background-color: #e3f2fd;
}

.card img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 2px solid #bbdefb;
}

.info h3 {
  margin: 0;
  font-size: 1.2rem;
  color: #1565c0;
}

.info p {
  margin: 6px 0 10px;
  font-size: 0.95rem;
  color: #666;
}

.info button {
  padding: 6px 12px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.info button:hover {
  background-color: #1565c0;
}

</style>
