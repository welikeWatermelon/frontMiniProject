<template>
  <div class="main-page">
    <!-- 우측 상단 로그인/회원가입 또는 로그아웃 -->
    <div class="auth-buttons">
      <template v-if="!isLoggedIn">
        <RouterLink to="/login">로그인</RouterLink>
        <RouterLink to="/register">회원가입</RouterLink>
      </template>
      <template v-else>
        <RouterLink to="/users/profile">나의프로필</RouterLink> <!-- ✅ 추가 -->
        <button @click="logout">로그아웃</button>
      </template>
    </div>

    <!-- 오늘의 퀘스트 -->
    <section class="quest-box">
      <h3>오늘의 퀘스트</h3>
      <p>💧 물 8잔 마시기</p>
    </section>

    <PopularCommunityBox />

    <!-- 추천 유튜브 건강 영상 -->
    <section class="youtube-box">
      <h3>🎥 추천 영양제 영상</h3>
      <div v-if="isLoading" class="loading">
        영상을 불러오는 중...
      </div>
      <div v-else-if="error" class="error">
        {{ error }}
      </div>
      <div v-else class="video-grid">
        <a 
          v-for="(video, index) in youtubeVideos" 
          :key="index" 
          :href="video.youtubeUrl" 
          target="_blank" 
          class="video-item"
        >
          <img :src="video.thumbnailUrl" alt="영양제 영상 썸네일" />
        </a>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import axios from 'axios'
import PopularCommunityBox from '@/components/PopularCommunityBox.vue' // ✅ 추가


const isLoggedIn = ref(!!localStorage.getItem('token'))
const router = useRouter()
const youtubeVideos = ref([])
const isLoading = ref(true)
const error = ref(null)

// 로그아웃 함수
const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  isLoggedIn.value = false
  alert('로그아웃 되었습니다.')
  router.push('/login')
}

// 조회수 포맷팅
const formatViewCount = (count) => {
  if (!count) return '0';
  
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + '백만'
  } else if (count >= 10000) {
    return (count / 10000).toFixed(1) + '만'
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1) + '천'
  } else {
    return count
  }
}

// 페이지 로드 시 유튜브 영상 데이터 가져오기
onMounted(async () => {
  try {

    const response = await axios.get('/api/youtube/top10') // ← 여기만 변경! (여기서 에러터짐)
    // ✅ 배열인지 확인
    const data = response.data

    if (Array.isArray(data)) {
      youtubeVideos.value = data

      data.forEach((video, idx) => {
        console.log(`[${idx + 1}] 썸네일: ${video.thumbnailUrl}`)
        console.log(`[${idx + 1}] 링크: ${video.youtubeUrl}`)
      })
    } else {
      console.warn('응답 데이터가 배열이 아닙니다:', data)
    }

    isLoading.value = false
  } catch (err) {
    console.error('유튜브 영상 호출 오류:', err)
    error.value = '영상을 불러올 수 없습니다. 잠시 후 다시 시도해주세요.'
    isLoading.value = false
  }
})
</script>

<style scoped>
.main-page {
  padding: 30px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #ffffff;
  font-family: 'Noto Sans KR', sans-serif;
}

.auth-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-bottom: 24px;
}

.auth-buttons a,
.auth-buttons button {
  color: #1976d2;
  text-decoration: none;
  font-weight: 600;
    font-size: 0.95rem; /* ✅ 추가 */
  background-color: #e3f2fd;
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #bbdefb;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.auth-buttons a:hover,
.auth-buttons button:hover {
  background-color: #bbdefb;
}

.quest-box,
.community-box,
.youtube-box {
  margin-bottom: 30px;
  background-color: #fefefe;
  border-radius: 10px;
  padding: 20px;
  border: 1px solid #bbdefb;
  box-shadow: 0 2px 6px rgba(25, 118, 210, 0.05);
}

.quest-box h3,
.community-box h3,
.youtube-box h3 {
  color: #1565c0;
  margin-bottom: 12px;
  font-size: 1.2rem;
}

.community-box ul {
  list-style: none;
  padding: 0;
}

.community-box li {
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  color: #333;
}

.community-box li span {
  color: #1565c0;
  font-weight: bold;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.video-item {
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease;
  display: block;
}

.video-item:hover {
  transform: translateY(-5px);
}

.video-item img {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 6px;
  aspect-ratio: 16/9;
  object-fit: cover;
  border: 1px solid #e0e0e0;
}

.video-title {
  font-weight: bold;
  font-size: 14px;
  color: #1976d2;
  margin-bottom: 2px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.channel-name {
  font-size: 12px;
  color: #9e9e9e;
}

.view-count {
  font-size: 11px;
  color: #9e9e9e;
}

.loading,
.error {
  text-align: center;
  padding: 20px;
  font-size: 0.95rem;
  color: #9e9e9e;
}

.error {
  color: #e74c3c;
}

@media (max-width: 600px) {
  .video-grid {
    grid-template-columns: 1fr;
  }
}
</style>