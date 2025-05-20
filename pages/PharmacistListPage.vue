<template>
  <div class="pharmacist-list">
    <h2>👩‍⚕️ 약사 목록</h2>
    <ul>
      <li v-for="p in pharmacists" :key="p.id" class="card">
        <img :src="p.profileImage" alt="profile" />
        <div class="info">
          <h3>{{ p.name }}</h3>
          <p>{{ p.title }}</p>
          <button @click="followPharmacist(p.id)">팔로우</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const pharmacists = ref([])
const token = localStorage.getItem('token')

onMounted(async () => {
  const res = await axios.get('http://localhost:8080/api/pharmacists', {
    headers: { Authorization: `Bearer ${token}` }
  })
  pharmacists.value = res.data
})

const followPharmacist = async (id) => {
  try {
    await axios.post('http://localhost:8080/api/follows', {
      pharmacistId: id
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    alert('팔로우 성공')
  } catch (e) {
    alert('이미 팔로우했거나 오류 발생')
  }
}
</script>

<style scoped>
.pharmacist-list {
  max-width: 800px;
  margin: 30px auto;
  padding: 24px;
  background-color: #ffffff;
  border: 1px solid #bbdefb;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(25, 118, 210, 0.05);
  font-family: 'Noto Sans KR', sans-serif;
}

.pharmacist-list h2 {
  text-align: center;
  color: #1976d2;
  margin-bottom: 24px;
  font-size: 1.5rem;
  font-weight: bold;
}

.pharmacist-list ul {
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
  transition: background-color 0.2s ease;
}

.card:hover {
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
  margin: 6px 0;
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
