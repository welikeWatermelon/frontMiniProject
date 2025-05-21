<template>
  <div class="landing-page">
    <!-- 🔹 배경 영상 -->
    <video autoplay muted loop class="background-video">
      <source src="@/assets/runVideo.mp4" type="video/mp4" />
      브라우저가 video 태그를 지원하지 않습니다.
    </video>

    <!-- 🔹 오버레이 텍스트/버튼 -->
    <div class="overlay">
      <h1>나를 위한 케어 서비스</h1>
      <h2>케어 박스와 시작하세요 !</h2>
      <div class="button-group">
        <button @click="goToRecommend">AI 영양제 추천받기</button>
        <button @click="goToMain">케어박스 홈 가기</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const goToRecommend = () => {
  router.push('/ai/personal-info')
}

const goToMain = () => {
  router.push('/main')
}
</script>

<style scoped>
.landing-page {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.background-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  background-color: rgba(0, 0, 0, 0.4); /* 어둡게 오버레이 */
  padding: 2rem;
  border-radius: 1rem;
}

.overlay h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.overlay h2 {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 1.5rem; /* 버튼 간격 더 넓게 */
  margin-top: 2rem;
}

.transparent-button {
  padding: 0.9rem 2rem; /* 버튼 크기 UP */
  font-size: 1.1rem;    /* 글씨 더 큼 */
  font-weight: 600;     /* 글씨 두껍게 */
  background-color: rgba(255, 255, 255, 0.15); /* 아주 부드러운 반투명 */
  color: white;
  border: 2px solid white;
  border-radius: 1.5rem; /* 버튼 둥글게 */
  cursor: pointer;
  backdrop-filter: blur(6px); /* 고급 유리 느낌 */
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
  box-shadow: 0 0 10px rgba(255,255,255,0.1); /* 살짝 glow */
}

.transparent-button:hover {
  background-color: rgba(255, 255, 255, 0.3); /* hover 시 더 또렷하게 */
  box-shadow: 0 0 15px rgba(255,255,255,0.3); /* glow 강조 */
}
</style>
