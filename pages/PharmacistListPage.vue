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
.pharmacist-list ul {
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
button {
  margin-top: 5px;
}
</style>
