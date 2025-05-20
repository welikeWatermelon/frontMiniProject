<template>
  <div class="calendar-page">
    <h2>📅 복용 캘린더</h2>

    <!-- 날짜 선택 -->
    <input type="date" v-model="selectedDate" @change="fetchSummary" />

    <!-- 시간대 버튼 -->
    <div class="time-buttons">
      <button @click="selectTime('MORNING')">아침</button>
      <button @click="selectTime('LUNCH')">점심</button>
      <button @click="selectTime('DINNER')">저녁</button>
      <button @click="selectTime('ETC')">기타</button>
    </div>

    <!-- 입력창 -->
    <div v-if="intakeTime">
      <input v-model="supplementName" placeholder="영양제 이름" />
      <input v-model.number="amountTakenMg" placeholder="복용량 (mg)" type="number" />
      <button @click="saveIntake">기록 저장</button>
    </div>

    <!-- 하루 요약 메시지 -->
    <div v-if="summary" class="summary-box">
      <h3>{{ summary.date }} 요약</h3>

      <div class="intake-list">
        <p v-for="(items, time) in groupedRecords" :key="time">
          <strong>{{ timeLabels[time] }}:</strong>
          <span v-if="items.length">{{ formatReadableIntakes(items) }}</span>
          <span v-else>기록 없음</span>
        </p>
      </div>

      <div class="message-box">
        <ul>
          <li v-for="item in summary.nutrientStatusList" :key="item.nutrientName">
            {{ item.message }}
          </li>
        </ul>
      </div>
    </div>
  </div>

  <!-- 알림 등록 0520 새 코드드 -->
  <div class="notification-box">
    <h3>🔔 알림 설정</h3>
    <input v-model="notificationMessage" placeholder="알림 메시지 입력" />

    <!-- ✅ 알림 시간 선택 -->
    <input type="datetime-local" v-model="notificationTime" />

    <button @click="registerNotification">알림 등록</button>
  </div>


</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'
import axios from 'axios'
// 추가 0520
import { useRoute } from 'vue-router'


const route = useRoute() // 해당 날짜로 수정 0520
const selectedDate = route.params.date // 해당 날짜로 수정 0520

const intakeTime = ref('')
const supplementName = ref('')
const amountTakenMg = ref(0)
const summary = ref({ intakeRecords: [], nutrientStatusList: [], date: selectedDate.value })
const userId = localStorage.getItem('userId')
const token = localStorage.getItem('token')

const timeLabels = {
  MORNING: '아침',
  LUNCH: '점심',
  DINNER: '저녁',
  ETC: '기타'
}

const selectTime = (timeType) => {
  intakeTime.value = timeType
}

const saveIntake = async () => {
  try {
    await axios.post('http://localhost:8080/api/calendar/intake', {
      supplementName: supplementName.value,
      amountTakenMg: amountTakenMg.value,
      date: selectedDate.value,
      intakeTimeType: intakeTime.value
    }, {
      params: { userId },
      headers: { Authorization: `Bearer ${token}` }
    })
    alert('복용 기록 저장 완료')
    await fetchSummary()
  } catch (err) {
    console.error(err)
    alert('기록 실패')
  }
}

const fetchSummary = async () => {
  try {
    const res = await axios.get('http://localhost:8080/api/calendar/summary', {
      params: { userId, date: selectedDate.value },
      headers: { Authorization: `Bearer ${token}` }
    })
    summary.value = res.data
  } catch (err) {
    console.error(err)
  }
}

watchEffect(() => {
  fetchSummary()
})

const groupedRecords = computed(() => {
  const grouped = {
    MORNING: [],
    LUNCH: [],
    DINNER: [],
    ETC: []
  }
  if (summary.value?.intakeRecords) {
    for (const record of summary.value.intakeRecords) {
      grouped[record.timeType]?.push(record)
    }
  }
  return grouped
})

const formatReadableIntakes = (items) => {
  return items.map(i => `${i.supplementName} (${i.amountTakenMg}mg)`).join(', ')
}

// 0520 알림 추가
const notificationMessage = ref('')
const notificationTime = ref('')  // 사용자가 입력할 날짜/시간

const registerNotification = async () => {
  if (!notificationMessage.value.trim() || !notificationTime.value) {
    alert("메시지와 알림 시간을 모두 입력해주세요!")
    return
  }

  try {
    await axios.post('http://localhost:8080/api/notifications', {
      message: notificationMessage.value,
      notifiedAt: new Date(notificationTime.value).toISOString()
    }, {
      params: { userId },
      headers: { Authorization: `Bearer ${token}` }
    })

    alert('알림이 등록되었습니다!')
    notificationMessage.value = ''
    notificationTime.value = ''
  } catch (err) {
    console.error('알림 등록 실패:', err)
    alert('알림 등록에 실패했습니다')
  }
}


</script>

<style scoped>
.calendar-page {
  padding: 30px;
  max-width: 700px;
  margin: 0 auto;
}

.time-buttons {
  margin: 20px 0;
  display: flex;
  gap: 10px;
}

.time-buttons button {
  padding: 6px 12px;
  background-color: #e0f2ff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

input {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  box-sizing: border-box;
}

.summary-box {
  margin-top: 30px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.intake-list p {
  margin: 8px 0;
}

.message-box {
  margin-top: 20px;
}

.message-box ul {
  list-style: disc;
  padding-left: 20px;
}

/* 0520 알림 추가 */
.notification-box {
  margin-top: 30px;
  padding: 20px;
  background-color: #fff9e6;
  border: 1px solid #ffdb99;
  border-radius: 8px;
}

</style>
