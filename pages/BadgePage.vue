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
  background-color: #ffffff;
}

.badge-page h2 {
  text-align: center;
  color: #1976d2;
  margin-bottom: 24px;
  font-size: 1.6rem;
  font-weight: 600;
}

.badge-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 20px;
}

.badge-item {
  text-align: center;
  background-color: #e3f2fd;          /* 전하의 하늘색 박스 컨셉 */
  border: 1px solid #bbdefb;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(25, 118, 210, 0.05);
  transition: transform 0.2s ease;
}

.badge-item:hover {
  transform: translateY(-4px);
}

.badge-item img {
  width: 64px;
  height: 64px;
  margin-bottom: 10px;
}

.badge-item p {
  margin: 6px 0 4px;
  font-weight: bold;
  color: #1565c0;
}

.badge-item small {
  display: block;
  color: #9e9e9e;
  font-size: 0.85rem;
}

  </style>