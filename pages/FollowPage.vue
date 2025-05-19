<template>
    <div class="follow-page">
      <h2>👨‍⚕️ 내가 팔로우한 약사</h2>
      <ul class="follow-list">
        <li v-for="pharmacist in pharmacists" :key="pharmacist.id">
          <h3>{{ pharmacist.name }}</h3>
          <p>{{ pharmacist.description }}</p>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  // import axios from 'axios'
  
  const pharmacists = ref([])
  
  onMounted(async () => {
    // const res = await axios.get('/api/follows/my')
    // pharmacists.value = res.data
    pharmacists.value = [
      {
        id: 1,
        name: '김약사',
        description: '건강한 삶을 위한 영양 코치'
      },
      {
        id: 2,
        name: '이약사',
        description: '영양제와 식단 관리 전문가'
      }
    ]
  })
  </script>
  
  <style scoped>
  .follow-page {
    padding: 30px;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .follow-list {
    list-style: none;
    padding: 0;
  }
  
  .follow-list li {
    padding: 15px;
    border-bottom: 1px solid #ccc;
  }
  
  .follow-list h3 {
    margin: 0;
    font-size: 1.2em;
  }
  </style>