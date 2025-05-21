<template>
  <div class="personal-info-page" :class="{ disappear: isLeaving }">
    <!-- 🔹 진행도 바 -->
    <div class="progress-bar">
      <div class="step active"></div>
      <div class="step"></div>
      <div class="step"></div>
      <div class="step"></div>
    </div>

    <h2>1. 기본 정보를 입력해주세요</h2>
    <form @submit.prevent="nextWithEffect">
      <div class="form-group">
        <label for="name">이름</label>
        <input v-model="name" id="name" required />
      </div>
      <div class="form-group">
        <label for="age">나이</label>
        <input type="number" v-model.number="age" id="age" required />
      </div>
      <div class="form-group">
        <label for="height">키 (cm)</label>
        <input type="number" v-model.number="height" id="height" required />
      </div>
      <div class="form-group">
        <label for="weight">몸무게 (kg)</label>
        <input type="number" v-model.number="weight" id="weight" required />
      </div>
      <button type="submit">다음으로</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAnswerStore } from '@/stores/answer'

const router = useRouter()
const answerStore = useAnswerStore()

const name = ref('')
const age = ref(null)
const height = ref(null)
const weight = ref(null)
const isLeaving = ref(false)

const nextWithEffect = () => {
  answerStore.name = name.value
  answerStore.age = age.value
  answerStore.height = height.value
  answerStore.weight = weight.value
  isLeaving.value = true
  setTimeout(() => {
    router.push('/ai/greeting')
  }, 700)
}
</script>

<style scoped>
.personal-info-page {
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #fff;
  color: #000;
  border-radius: 10px;
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.personal-info-page.disappear {
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

/* 폼 입력 */
.form-group {
  margin-bottom: 1.5rem;
}
label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
input {
  width: 100%;
  padding: 0.6rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

/* 버튼 */
button {
  margin-top: 1rem;
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
