<template>
  <div class="calendar-grid-page">
    <h2>📆 복용 캘린더</h2>

    <!-- 월 이동 헤더 -->
    <div class="calendar-header">
      <button @click="prevMonth">◀ 이전달</button>
      <span>{{ currentYear }}년 {{ currentMonth + 1 }}월</span>
      <button @click="nextMonth">다음달 ▶</button>
    </div>

    <!-- 요일 헤더 -->
    <div class="weekday-row">
      <div v-for="day in weekdays" :key="day" class="weekday-cell">
        {{ day }}
      </div>
    </div>

    <!-- 달력 격자 -->
    <div class="calendar-grid">
      <div
        v-for="blank in firstDayOfMonth"
        :key="'blank-' + blank"
        class="calendar-cell empty"
      />
      <div
        v-for="day in daysInMonth"
        :key="day.date"
        class="calendar-cell"
        @click="goToDate(day.date)"
      >
        <strong>{{ day.label }}</strong>
        <div class="record-summary">
          {{ day.summary || '기록 없음' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const today = new Date()

const daysInMonth = ref([])
const firstDayOfMonth = ref(0)
const userId = localStorage.getItem('userId')
const token = localStorage.getItem('token')

const currentYear = ref(today.getFullYear())
const currentMonth = ref(today.getMonth()) // 0 ~ 11

const weekdays = ['일', '월', '화', '수', '목', '금', '토']

const getDays = async () => {
  const year = currentYear.value
  const month = currentMonth.value
  const firstDate = new Date(year, month, 1)
  const lastDate = new Date(year, month + 1, 0).getDate()

  firstDayOfMonth.value = firstDate.getDay()

  const days = []
  for (let i = 1; i <= lastDate; i++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`
    days.push({ label: i, date: dateStr, summary: '' })
  }
  daysInMonth.value = days
  fetchSummaries()
}

const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value -= 1
  } else {
    currentMonth.value -= 1
  }
  getDays()
}

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value += 1
  } else {
    currentMonth.value += 1
  }
  getDays()
}

const fetchSummaries = async () => {
  for (let day of daysInMonth.value) {
    try {
      const res = await axios.get('http://localhost:8080/api/calendar/summary', {
        params: { userId, date: day.date },
        headers: { Authorization: `Bearer ${token}` }
      })
      const summary = res.data?.nutrientStatusList?.map(s => s.message).join(', ')
      day.summary = summary || '✔ 기록 있음'
    } catch (e) {
      day.summary = ''
    }
  }
}

const goToDate = (date) => {
  router.push(`/calendar/${date}`)
}

onMounted(getDays)
</script>

<style scoped>
.calendar-grid-page {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.calendar-header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.weekday-row {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
}

.weekday-cell {
  padding: 8px 0;
  background-color: #f0f0f0;
  border-radius: 4px;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  margin-top: 10px;
}

.calendar-cell {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 6px;
  background-color: #f9f9f9;
  cursor: pointer;
  min-height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.calendar-cell.empty {
  background: transparent;
  border: none;
  cursor: default;
}

.calendar-cell:hover {
  background-color: #eaf4ff;
}

.record-summary {
  font-size: 0.8rem;
  color: #333;
  margin-top: 6px;
}
</style>