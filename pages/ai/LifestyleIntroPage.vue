<template>
  <div class="lifestyle-intro-page" :class="{ disappear: isLeaving }">
    <!-- 🔹 진행도 바 -->
    <div class="progress-bar">
      <div class="step active"></div>
      <div class="step active"></div>
      <div class="step active"></div>
      <div class="step"></div>
    </div>

    <h2>{{ userName }} 님의 고민을 확인했습니다!</h2>
    <p>이제 생활 습관에 대해 알려주세요.</p>
    <p class="sub">소요시간 : 약 30초</p>

    <button @click="nextWithEffect">시작하기</button>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAnswerStore } from '@/stores/answer'

const router = useRouter()
const answerStore = useAnswerStore()
const userName = computed(() => answerStore.name)
const isLeaving = ref(false)

const nextWithEffect = () => {
  isLeaving.value = true
  setTimeout(() => {
    router.push('/ai/lifestyle-question')
  }, 700)
}
</script>

<style scoped>
.lifestyle-intro-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  background-color: #fff;
  color: #000;
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.lifestyle-intro-page.disappear {
  opacity: 0;
  transform: translateY(50px);
}

/* 진행도 바 */
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

h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}
p {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}
.sub {
  color: #888;
  font-size: 0.9rem;
}
button {
  margin-top: 2rem;
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
