<template>
  <div class="health-category-page" :class="{ disappear: isLeaving }">
    <!-- 🔹 진행도 바 -->
    <div class="progress-bar">
      <div class="step active"></div>
      <div class="step active"></div>
      <div class="step"></div>
      <div class="step"></div>
    </div>

    <h2>3. 어떤 건강 정보가 가장 궁금한가요?</h2>
    <p>한 가지만 선택해주세요</p>

    <div class="category-list">
      <button
        v-for="(category, index) in categories"
        :key="index"
        :class="{ selected: selectedIndex === index }"
        @click="selectCategory(category, index)"
      >
        {{ category.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAnswerStore } from '@/stores/answer'

const router = useRouter()
const answerStore = useAnswerStore()

const isLeaving = ref(false)
const selectedIndex = ref(null)

const categories = [
  { key: '혈관', label: '1. 혈관 · 혈액 순환' },
  { key: '소화', label: '2. 소화 · 장' },
  { key: '피부', label: '3. 피부' },
  { key: '눈', label: '4. 눈' },
  { key: '두뇌', label: '5. 두뇌 활동' },
  { key: '피로', label: '6. 피로감' },
  { key: '관절', label: '7. 뼈 · 관절' },
  { key: '면역', label: '8. 면역' },
  { key: '모발', label: '9. 모발' }
]

const selectCategory = (category, index) => {
  selectedIndex.value = index
  answerStore.healthCategory = category.key
  isLeaving.value = true
  setTimeout(() => {
    router.push('/ai/health-detail')
  }, 700)
}
</script>

<style scoped>
.health-category-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  background-color: #fff;
  color: #000;
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.health-category-page.disappear {
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
  margin-bottom: 1rem;
}
p {
  margin-bottom: 2rem;
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
button {
  background-color: #f0f0f0;
  color: #000;
  padding: 1rem;
  font-size: 1.1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}
button:hover {
  background-color: #e0e0e0;
}
button.selected {
  background-color: #1976d2;
  color: white;
  border: 2px solid #1565c0;
}
</style>
