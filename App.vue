<template>
  <div>
    <Header />
    <RouterView />
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import { RouterView } from 'vue-router'
// 0520 알림 기능 추가 
import { onMounted } from 'vue'
import { fetchTodayNotifications, startNotificationWatcher } from './composables/useNotificationWatcher'

onMounted(() => {
  // ✅ 브라우저 알림 권한 요청
  if (Notification.permission !== 'granted') {
    Notification.requestPermission()
  }

  // ✅ 오늘의 알림 불러오고 감시 시작
  fetchTodayNotifications()
  startNotificationWatcher()
})
</script>
