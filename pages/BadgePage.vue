<template>
    <div class="badge-page">
      <h2>🏅 획득한 뱃지</h2>
      <div class="badge-grid">
        <div v-for="badge in badges" :key="badge.id" class="badge-item">
          <img :src="badge.imageUrl" alt="badge.name" />
          <p>{{ badge.name }}</p>
          <small>{{ badge.description }}</small>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  // import axios from 'axios'
  
  const badges = ref([])
  
  onMounted(async () => {
    // const res = await axios.get('/api/badges/my')
    // badges.value = res.data
    badges.value = [
      {
        id: 1,
        name: '첫 복용 완료',
        description: '처음으로 영양제를 복용했어요!',
        imageUrl: 'https://via.placeholder.com/64x64.png?text=🥇'
      },
      {
        id: 2,
        name: '7일 연속 복용',
        description: '일주일 동안 꾸준히 복용했어요!',
        imageUrl: 'https://via.placeholder.com/64x64.png?text=🔥'
      }
    ]
  })
  </script>
  
  <style scoped>
  .badge-page {
    padding: 30px;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .badge-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }
  
  .badge-item {
    text-align: center;
    background-color: #f0f8ff;
    border: 1px solid #aad;
    padding: 15px;
    border-radius: 10px;
  }
  
  .badge-item img {
    width: 64px;
    height: 64px;
    margin-bottom: 10px;
  }
  </style>