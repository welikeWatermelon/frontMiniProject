<template>
  <div class="final-result-page" :class="{ disappear: isLeaving }">
    <!-- 🔹 진행도 바 -->
    <div class="progress-bar">
      <div class="step active"></div>
      <div class="step active"></div>
      <div class="step active"></div>
      <div class="step active"></div>
    </div>

    <h2>🎯 {{ userName }} 님을 위한 맞춤 영양제 분석 결과</h2>

    <div v-if="loading" class="loading">
      GPT가 분석 중입니다... 잠시만 기다려주세요 🧠
    </div>

    <div v-else class="result-box">
      <p>{{ result }}</p>
    </div>

    <button @click="goHome">처음으로</button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useAnswerStore } from '@/stores/answer'

const router = useRouter()
const answerStore = useAnswerStore()
const userName = computed(() => answerStore.name)

const loading = ref(true)
const result = ref('')
const isLeaving = ref(false)

onMounted(async () => {
  const payload = {
    answers: [
      ...answerStore.detailSymptoms,
      ...answerStore.healthConditions,
      answerStore.exercise,
      answerStore.diet,
      answerStore.marketingSource
    ]
  }

  try {
    const res = await axios.post('/api/analysis', payload)
    result.value = res.data.recommendation
  } catch (err) {
    result.value = 'GPT 분석 중 오류가 발생했습니다. 다시 시도해주세요.'
  } finally {
    loading.value = false
  }
})

const goHome = () => {
  isLeaving.value = true
  setTimeout(() => {
    router.push('/')
  }, 700)
}
</script>

<style scoped>
.final-result-page {
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  background-color: #fff;
  color: #000;
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.final-result-page.disappear {
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
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.loading {
  font-size: 1.2rem;
  margin-top: 2rem;
  color: #1976d2;
}

.result-box {
  background-color: #f0f8ff;
  padding: 1.5rem;
  border-radius: 1rem;
  font-size: 1.1rem;
  color: #333;
  margin: 2rem 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

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
