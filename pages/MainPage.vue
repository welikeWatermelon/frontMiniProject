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
      <h3>🎥 추천 영양제 영상</h3>
      <div v-if="isLoading" class="loading">
        영상을 불러오는 중...
      </div>
      <div v-else-if="error" class="error">
        {{ error }}
      </div>
      <div v-else class="video-grid">
        <a 
          v-for="video in youtubeVideos" 
          :key="video.id" 
          :href="`https://www.youtube.com/watch?v=${video.videoId}`" 
          target="_blank" 
          class="video-item"
        >
          <img :src="video.thumbnailUrl" :alt="video.title" />
          <div class="video-info">
            <p class="video-title">{{ video.title }}</p>
            <p class="channel-name">{{ video.channelTitle }}</p>
            <p class="view-count">조회수 {{ formatViewCount(video.viewCount) }}회</p>
          </div>
        </a>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import axios from 'axios'

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
    // 백엔드에서 최대 10개의 영양제 관련 인기 영상 가져오기
    const response = await axios.get('/api/youtube/nutrition', {
      params: { limit: 10 }
    })
    
    if (response.data && response.data.length > 0) {
      youtubeVideos.value = response.data
      console.log('유튜브 영상 데이터:', youtubeVideos.value)
    } else {
      // 데이터가 없는 경우 영상 새로고침 API 호출
      await axios.post('/api/youtube/refresh')
      
      // 새로고침 후 다시 데이터 조회
      const refreshResponse = await axios.get('/api/youtube/nutrition', {
        params: { limit: 10 }
      })
      youtubeVideos.value = refreshResponse.data
      console.log('새로고침 후 유튜브 영상 데이터:', youtubeVideos.value)
    }
    
    isLoading.value = false
  } catch (err) {
    console.error('유튜브 영상을 불러오는 중 오류가 발생했습니다:', err)
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
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
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
  border-radius: 5px;
  margin-bottom: 5px;
  aspect-ratio: 16/9;
  object-fit: cover;
}

.video-info {
  padding: 5px 0;
}

.video-title {
  font-weight: bold;
  margin: 0 0 5px 0;
  font-size: 14px;
  /* 2줄로 제한하고 넘치면 ...로 표시 */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.channel-name {
  margin: 0 0 3px 0;
  font-size: 12px;
  color: #666;
}

.view-count {
  margin: 0;
  font-size: 11px;
  color: #888;
}

.loading,
.error {
  text-align: center;
  padding: 20px;
  color: #666;
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