<template>
  <div class="main-page">
    <!-- 우측 상단 로그인/회원가입 또는 로그아웃 -->
    <div class="auth-buttons">
      <template v-if="!isLoggedIn">
        <RouterLink to="/login">로그인</RouterLink>
        <RouterLink to="/register">회원가입</RouterLink>
      </template>
      <template v-else>
        <button @click="logout">로그아웃</button>
      </template>
    </div>

    <!-- 오늘의 퀘스트 -->
    <section class="quest-box">
      <h3>오늘의 퀘스트</h3>
      <p>💧 물 8잔 마시기</p>
    </section>

    <!-- 커뮤니티 인기 글 -->
    <section class="community-box">
      <h3>🔥 커뮤니티 인기 글</h3>
      <ul>
        <li>건강한 식습관 기르기 <span>💬 12</span></li>
        <li>영양제 고르는 꿀팁 <span>💬 8</span></li>
        <li>러닝 시작했습니다 <span>💬 5</span></li>
      </ul>
    </section>

    <!-- 추천 유튜브 건강 영상 -->
    <section class="youtube-box">
      <h3>🎥 추천 건강 영상</h3>
      <div class="video-grid">
        <div class="video-item">
          <img src="https://via.placeholder.com/100x60.png?text=운동" alt="영상1" />
          <p>집에서 하는 홈트 운동 팁</p>
        </div>
        <div class="video-item">
          <img src="https://via.placeholder.com/100x60.png?text=식단" alt="영상2" />
          <p>건강한 식단 레시피</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const isLoggedIn = ref(!!localStorage.getItem('token'))
const router = useRouter()

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  isLoggedIn.value = false
  alert('로그아웃 되었습니다.')
  router.push('/login')
}
</script>

<style scoped>
.main-page {
  padding: 30px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #ffffff;
  font-family: 'Pretendard', sans-serif;
}

.auth-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-bottom: 20px;
}

.auth-buttons a,
.auth-buttons button {
  color: #2c3e50;
  text-decoration: none;
  font-weight: bold;
  background-color: #eaf2ff;
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

.quest-box,
.community-box,
.youtube-box {
  margin-bottom: 30px;
}

.community-box ul {
  list-style: none;
  padding: 0;
}

.community-box li {
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
}

.video-grid {
  display: flex;
  gap: 20px;
}

.video-item img {
  width: 100px;
  height: 60px;
  border-radius: 5px;
  margin-bottom: 5px;
}
</style>
