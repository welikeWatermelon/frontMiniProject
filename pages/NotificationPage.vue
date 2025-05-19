<template>
    <div class="notification-page">
      <h2>🔔 알림</h2>
      <ul class="notification-list">
        <li v-for="note in notifications" :key="note.id" :class="{ unread: !note.read }">
          <p>{{ note.message }}</p>
          <small>{{ note.date }}</small>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  // import axios from 'axios'
  
  const notifications = ref([])
  
  onMounted(async () => {
    // const res = await axios.get('/api/notifications')
    // notifications.value = res.data
    notifications.value = [
      { id: 1, message: '오늘 비타민C를 잊지 마세요!', date: '2025-05-19', read: false },
      { id: 2, message: '마그네슘 복용 시간입니다.', date: '2025-05-18', read: true },
      { id: 3, message: '새로운 뱃지를 획득했어요!', date: '2025-05-17', read: false }
    ]
  })
  </script>
  
  <style scoped>
  .notification-page {
    padding: 30px;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .notification-list {
    list-style: none;
    padding: 0;
  }
  
  .notification-list li {
    padding: 12px;
    margin-bottom: 10px;
    border-radius: 6px;
    border: 1px solid #ccc;
    background-color: #fefefe;
  }
  
  .notification-list li.unread {
    background-color: #fff8dc;
    font-weight: bold;
  }
  </style>