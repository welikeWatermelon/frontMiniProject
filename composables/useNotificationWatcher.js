// 0520 알림 코드

import { ref } from 'vue'
import axios from 'axios'

const notifications = ref([])
const alreadyNotifiedIds = new Set()

export const fetchTodayNotifications = async () => {
  const userId = localStorage.getItem('userId')
  const token = localStorage.getItem('token')
  const res = await axios.get('http://localhost:8080/api/notifications/today', {
    params: { userId },
    headers: { Authorization: `Bearer ${token}` }
  })
  notifications.value = res.data
}

export const startNotificationWatcher = () => {
  setInterval(() => {
    const now = new Date()

    for (const n of notifications.value) {
      if (n.read) continue  // ✅ 이미 읽음 처리된 건 제외

      const notifyTime = new Date(n.notifiedAt)
      const diffMillis = notifyTime.getTime() - now.getTime()
      const diffMinutes = diffMillis / 1000 / 60

      // ✅ 현재 시간 기준 5~10분 전 사이 알림만
      if (diffMinutes >= 5 && diffMinutes <= 10 && !alreadyNotifiedIds.has(n.id)) {
        new Notification(`🔔 ${n.message}!`)
        alreadyNotifiedIds.add(n.id)
      }
    }
  }, 10000) // 10초마다 검사
}
