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
          <p>{{ f.title }}</p>
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

// onMounted(async () => {
//   const res = await axios.get('http://localhost:8080/api/follows/my', {
//     headers: { Authorization: `Bearer ${token}` }
//   })
//   follows.value = res.data
// })

onMounted(async () => {
  const res = await axios.get('http://localhost:8080/api/follows/my', {
    headers: { Authorization: `Bearer ${token}` }
  })
//   console.log('[👀 백엔드 응답 확인]', res.data) // ← 이게 콘솔에 나옴!
//   console.log('[🐾 저장된 토큰]', token)

  follows.value = res.data
})
</script>

<style scoped>
.followed-list ul {
  list-style: none;
  padding: 0;
}
.card {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  align-items: center;
}
.card img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.info h3 {
  margin: 0;
}
</style>
