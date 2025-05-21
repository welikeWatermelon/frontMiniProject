<template>
  <div class="marketing-survey-page" :class="{ disappear: isLeaving }">
    <!-- 🔹 진행도 바 -->
    <div class="progress-bar">
      <div class="step active"></div>
      <div class="step active"></div>
      <div class="step active"></div>
      <div class="step active"></div>
    </div>

    <h2>5. 케어박스를 어떻게 알게 되셨나요?</h2>
    <p>하나만 선택해주세요</p>

    <div class="radio-group">
      <label v-for="(option, index) in options" :key="index">
        <input type="radio" :value="option" v-model="selected" />
        <span>{{ option }}</span>
      </label>
    </div>

    <button @click="nextWithEffect" :disabled="!selected">결과 보기</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAnswerStore } from '@/stores/answer'

const router = useRouter()
const answerStore = useAnswerStore()
const selected = ref('')
const isLeaving = ref(false)

const options = [
  '지인 추천',
  'SNS',
  '네이버 · 다음 블로그',
  'TV · 유튜브 광고',
  '기타'
]

const nextWithEffect = () => {
  answerStore.marketingSource = selected.value
  isLeaving.value = true
  setTimeout(() => {
    router.push('/ai/result')
  }, 700)
}
</script>

<style scoped>
.marketing-survey-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  background-color: #fff;
  color: #000;
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.marketing-survey-page.disappear {
  opacity: 0;
  transform: translateY(50px);
}

/* 🔹 진행도 바 */
.progress-bar {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
}
.step {
  width: 60px;
  height: 4px;
  border-radius: 2px;
  background-color: #eee;
}
.step.active {
  background-color: #ff5722;
}

/* 🔹 라디오 그룹 */
.radio-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: stretch;
  margin-bottom: 2rem;
}
label {
  display: flex;
  align-items: center;
  cursor: pointer;
}
input[type='radio'] {
  display: none;
}
input[type='radio'] + span {
  display: inline-block;
  padding: 0.8rem 1rem;
  background-color: #f0f0f0;
  border-radius: 0.5rem;
  width: 100%;
  text-align: left;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}
input[type='radio']:checked + span {
  background-color: #1976d2;
  color: #fff;
  font-weight: 600;
  border: 2px solid #1565c0;
}

/* 🔹 버튼 */
button {
  background-color: #1976d2;
  color: white;
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
button:disabled {
  background-color: #bbb;
  cursor: not-allowed;
}
button:hover:enabled {
  background-color: #1565c0;
}
</style>
