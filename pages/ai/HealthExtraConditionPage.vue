<template>
  <div class="health-condition-page" :class="{ disappear: isLeaving }">
    <!-- 🔹 진행도 바 -->
    <div class="progress-bar">
      <div class="step active"></div>
      <div class="step active"></div>
      <div class="step"></div>
      <div class="step"></div>
    </div>

    <h2>3-2. 추가로 해당되는 것을 선택해주세요</h2>
    <p>중복 선택 가능합니다</p>

    <div class="checkbox-group">
      <label v-for="(item, index) in options" :key="index">
        <input type="checkbox" :value="item" v-model="selected" />
        <span>{{ item }}</span>
      </label>
    </div>

    <button @click="nextWithEffect">다음</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAnswerStore } from '@/stores/answer'

const router = useRouter()
const answerStore = useAnswerStore()

const selected = ref([])
const isLeaving = ref(false)

const options = [
  '혈압이 낮아요',
  '혈압이 높아요',
  '평소 더위를 타고, 땀을 많이 흘려요',
  '항응고제와 항혈전제를 복용하고 있어요',
  '꿀, 프로폴리스 알레르기가 있어요'
]

const nextWithEffect = () => {
  answerStore.healthConditions = selected.value
  isLeaving.value = true
  setTimeout(() => {
    router.push('/ai/lifestyle-intro')
  }, 700)
}
</script>

<style scoped>
.health-condition-page {
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #fff;
  color: #000;
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.health-condition-page.disappear {
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

/* 체크박스 스타일 */
.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1.5rem;
}
label {
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
}
input[type='checkbox'] {
  display: none;
}
input[type='checkbox'] + span {
  display: inline-block;
  padding: 0.8rem 1rem;
  background-color: #f0f0f0;
  border-radius: 0.5rem;
  width: 100%;
  text-align: left;
  transition: all 0.3s ease;
}
input[type='checkbox']:checked + span {
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
button:hover {
  background-color: #1565c0;
}
</style>
