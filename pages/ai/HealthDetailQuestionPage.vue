<template>
  <div class="health-detail-page" :class="{ disappear: isLeaving }">
    <!-- 🔹 진행도 바 -->
    <div class="progress-bar">
      <div class="step active"></div>
      <div class="step active"></div>
      <div class="step"></div>
      <div class="step"></div>
    </div>

    <h2>3-1. {{ categoryTitle }} 관련 증상이 있으신가요?</h2>
    <p>해당되는 항목을 모두 선택해주세요</p>

    <div class="checkbox-group">
      <label v-for="(item, index) in currentQuestions" :key="index">
        <input type="checkbox" :value="item" v-model="selected" />
        <span>{{ item }}</span>
      </label>
    </div>

    <button @click="nextWithEffect">다음</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAnswerStore } from '@/stores/answer'

const router = useRouter()
const answerStore = useAnswerStore()

const selected = ref([])
const isLeaving = ref(false)

const allQuestions = {혈관: [
    '상처가 잘 낫지 않아요', '손발 끝이 자주 저려요', '잇몸에서 피가 나요',
    '얼굴이 자주 창백해져요', '혈압이 높아요 (140/90 이상)', '혈압이 낮아요 (90/60 이하)',
    '땀을 많이 흘리고 더위를 잘 타요', '아스피린·항응고제 등을 복용 중이에요',
    '혈관 건강이 걱정돼요'
  ],
  소화: [
    '속이 자주 더부룩하고 소화가 잘 안돼요', '변비나 설사가 잦아요', '장내 유익균이 부족하다는 말을 들었어요',
    '식욕이 없거나 체중이 줄었어요', '유당불내증이 있어요', '소화에 도움이 되는 영양제를 찾고 있어요'
  ],
  피부: [
    '피부가 건조하고 각질이 많아요', '트러블이나 여드름이 자주 생겨요', '피부가 칙칙하고 생기가 없어요',
    '염증이나 붉은기 있는 피부가 걱정돼요', '피부 재생력이 떨어진 것 같아요', '피부가 얇고 예민해요'
  ],
  눈: [
    '눈이 쉽게 피로해지고 침침해요', '건조해서 인공눈물을 자주 써요', '야간 시력이 약해졌어요',
    '눈이 충혈되거나 가려워요', '눈 건강이 걱정돼요'
  ],
  두뇌: [
    '집중력이 떨어졌어요', '자주 깜빡깜빡 잊어요', '스트레스를 잘 못 견뎌요',
    '멍한 시간이 자주 있어요', '두뇌활동이 저하된 것 같아요', '시험/공부 집중에 도움되는 영양제가 필요해요'
  ],
  피로: [
    '아침에 일어나도 피곤해요', '근육이 쉽게 뭉치고 쥐가 나요', '계단만 올라가도 숨이 차요',
    '하루 종일 무기력해요', '커피를 마셔도 기운이 안 나요', '만성 피로를 느껴요'
  ],
  관절: [
    '관절이 자주 뻣뻣하고 뻐근해요', '무릎이나 손목 통증이 있어요', '뼈가 약해졌다는 말을 들었어요',
    '골다공증 가족력이 있어요', '키 성장이나 관절 보조가 필요해요'
  ],
  면역: [
    '감기에 자주 걸려요', '상처나 구내염이 자주 생겨요', '입술에 물집(헤르페스)이 자주 나요',
    '아토피나 알레르기 반응이 있어요', '피곤할 때 면역력이 확 떨어져요', '면역기능 향상이 필요해요'
  ],
  모발: [
    '머리카락이 얇아지고 힘이 없어요', '머리가 많이 빠져요', '탈모가 진행 중이에요',
    '두피가 가렵거나 지루성 피부염이 있어요', '모발 건강을 전반적으로 개선하고 싶어요'
  ]}
const category = answerStore.healthCategory
const currentQuestions = computed(() => allQuestions[category])
const categoryTitle = computed(() => categoriesMap[category] || category)

const categoriesMap = { 
  혈관: '혈관 · 혈액 순환',
  소화: '소화 · 장',
  피부: '피부',
  눈: '눈',
  두뇌: '두뇌 활동',
  피로: '피로감',
  관절: '뼈 · 관절',
  면역: '면역',
  모발: '모발' }

const nextWithEffect = () => {
  answerStore.detailSymptoms = selected.value
  isLeaving.value = true
  setTimeout(() => {
    router.push('/ai/health-condition')
  }, 700)
}
</script>

<style scoped>
.health-detail-page {
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #fff;
  color: #000;
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.health-detail-page.disappear {
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

/* 체크박스 그룹 */
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
