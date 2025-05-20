<!-- 0520 알림 설정 추가 -->
<template>
  <div class="notification-detail-page">
    <h2>📋 오늘의 알림</h2>

    <ul v-if="notifications.length">
      <li v-for="n in notifications" :key="n.id" :class="{ read: n.read }">
        <!-- 여기 데이터 들어감 -->
        <input type="checkbox" :checked="n.read" @change="markAsRead(n.id, n)" />
        <span>{{ formatTime(n.notifiedAt) }} - {{ n.message }}</span>
      </li>
    </ul>

    <p v-else>아직 알림설정이 없습니다</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const notifications = ref([])
const userId = localStorage.getItem('userId')
const token = localStorage.getItem('token')

const fetchTodayNotifications = async () => {
  try {
    const res = await axios.get('http://localhost:8080/api/notifications/today', {
      params: { userId },
      headers: { Authorization: `Bearer ${token}` }
    })
    notifications.value = res.data
  } catch (err) {
    console.error('알림 조회 실패:', err)
  }
}

const formatTime = (datetimeStr) => {
  const date = new Date(datetimeStr)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

onMounted(fetchTodayNotifications)

// 이 함수는 데이터 들어감
const markAsRead = async (id, notification) => {
  try {
    await axios.post(`http://localhost:8080/api/notifications/read/${id}`, null, {
      headers: { Authorization: `Bearer ${token}` }
    })
    notification.read = true  // ✅ UI에서도 즉시 반영!
  } catch (err) {
    console.error('읽음 처리 실패:', err)
  }
}



</script>

<style scoped>
.notification-detail-page {
  max-width: 700px;
  margin: 30px auto;
  padding: 24px;
  background-color: #ffffff;
  border: 1px solid #bbdefb;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(25, 118, 210, 0.06);
  font-family: 'Noto Sans KR', sans-serif;
}

.notification-detail-page h2 {
  color: #1976d2;
  margin-bottom: 20px;
  font-size: 1.4rem;
  font-weight: bold;
  text-align: center;
}

.notification-detail-page ul {
  list-style: none;
  padding-left: 0;
}

.notification-detail-page li {
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #fefefe;
  border: 1px solid #bbdefb;
  padding: 12px 16px;
  border-radius: 10px;
  margin-bottom: 12px;
  transition: background-color 0.2s ease;
}

.notification-detail-page li:hover {
  background-color: #e3f2fd;
}

.notification-detail-page input[type="checkbox"] {
  transform: scale(1.2);
  accent-color: #1976d2;
}

.notification-detail-page span {
  font-size: 1rem;
  color: #1565c0;
}

.read span {
  text-decoration: line-through;
  color: #9e9e9e;
}

</style>
