<template>
  <div class="lifestyle-question-page" :class="{ disappear: isLeaving }">
    <!-- 🔹 진행도 바 -->
    <div class="progress-bar">
      <div class="step active"></div>
      <div class="step active"></div>
      <div class="step active"></div>
      <div class="step"></div>
    </div>

    <h2>4. 생활 습관에 대해 알려주세요</h2>

    <div class="question-block">
      <h3>✅ 질문 1: 운동 습관은 어떤가요?</h3>
      <div class="radio-group">
        <label v-for="(option, index) in exerciseOptions" :key="'ex' + index">
          <input type="radio" :value="option" v-model="exercise" />
          <span>{{ option }}</span>
        </label>
      </div>
    </div>

    <div class="question-block">
      <h3>✅ 질문 2: 식습관은 어떤 편인가요?</h3>
      <div class="radio-group">
        <label v-for="(option, index) in dietOptions" :key="'diet' + index">
          <input type="radio" :value="option" v-model="diet" />
          <span>{{ option }}</span>
        </label>
      </div>
    </div>

    <button @click="nextWithEffect" :disabled="!exercise || !diet">다음</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAnswerStore } from '@/stores/answer'

const router = useRouter()
const answerStore = useAnswerStore()

const exercise = ref('')
const diet = ref('')
const isLeaving = ref(false)

const exerciseOptions = [
  '거의 하지 않아요',
  '주 1~2회 가볍게 해요',
  '주 3~5회 규칙적으로 운동해요',
  '거의 매일 고강도 운동을 해요'
]

const dietOptions = [
  '야식·인스턴트 위주예요',
  '외식을 자주 해요',
  '채소·과일 섭취가 적어요',
  '비교적 균형 잡힌 식사를 해요'
]

const nextWithEffect = () => {
  answerStore.exercise = exercise.value
  answerStore.diet = diet.value
  isLeaving.value = true
  setTimeout(() => {
    router.push('/ai/analysis-loading')
  }, 700)
}
</script>

<style scoped>
.lifestyle-question-page {
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #fff;
  color: #000;
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.lifestyle-question-page.disappear {
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

.question-block {
  margin-bottom: 2rem;
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
}

label {
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
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
  transition: all 0.3s ease;
}
input[type='radio']:checked + span {
  background-color: #1976d2;
  color: #fff;
  font-weight: 600;
  border: 2px solid #1565c0;
}

/* 버튼 */
button {
  margin-top: 2rem;
  padding: 0.8rem 2rem;
  background-color: #1976d2;
  color: white;
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
