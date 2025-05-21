<template>
  <div class="analysis-loading-page" :class="{ disappear: isLeaving }">
    <!-- 🔹 진행도 바 -->
    <div class="progress-bar">
      <div class="step active"></div>
      <div class="step active"></div>
      <div class="step active"></div>
      <div class="step active"></div>
    </div>

    <h2>{{ userName }} 님을 위한 AI 진단을 시작합니다 🤖</h2>
    <p>결과를 분석하는 동안 2가지만 더 여쭤볼게요</p>

    <button @click="nextWithAnimation">계속하기</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAnswerStore } from '@/stores/answer'

const router = useRouter()
const answerStore = useAnswerStore()
const userName = computed(() => answerStore.name)

const isLeaving = ref(false)

const nextWithAnimation = () => {
  isLeaving.value = true
  setTimeout(() => {
    router.push('/ai/marketing-survey')
  }, 700) // 애니메이션 시간과 맞춤
}
</script>

<style scoped>
/* 🔹 기본 구조 */
.analysis-loading-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  background-color: #fff;
  color: #000;
  transition: opacity 0.7s ease, transform 0.7s ease;
}

/* 🔹 연기처럼 사라지는 애니메이션 */
.analysis-loading-page.disappear {
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

/* 🔹 타이틀/텍스트 */
h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}
p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
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
button:hover {
  background-color: #1565c0;
}
</style>
