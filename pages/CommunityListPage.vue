<template>
  <div class="community-page">
    <h2>📋 게시판</h2>
    <div class="sort-buttons">
  <button @click="fetchPosts('popular')">🔥 인기순</button>
  <button @click="fetchPosts('recent')">🕒 최신순</button>
  <button @click="fetchPosts('title')">🔤 제목순</button>
</div>
    <RouterLink to="/community/new">
      <button>➕ 글 작성</button>
    </RouterLink>

    <ul class="post-list">
      <li v-if="posts.length === 0">게시글이 없습니다.</li>
      <li v-for="post in posts" :key="post.id" @click="goToDetail(post.id)">
        <h4>{{ post.title }}</h4>
        <p class="meta">by {{ post.authorName || '작성자 없음' }}</p>
      </li>
    </ul>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const posts = ref([])

const token = localStorage.getItem('token')

const fetchPosts = async (sort = '') => {
  try {
    const res = await axios.get('http://localhost:8080/api/community/posts', {
      params: { sort },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    posts.value = res.data
  } catch (err) {
    console.error('게시글 불러오기 실패:', err)
  }
}



const goToDetail = (postId) => {
  router.push(`/community/${postId}`)
}

const formatDate = (datetime) => {
  return new Date(datetime).toLocaleString()
}

onMounted(() => {
  fetchPosts('recent')
})

</script>

<style scoped>
.community-page {
  max-width: 800px;
  margin: 30px auto;
  padding: 24px;
  background-color: #ffffff;
  border: 1px solid #bbdefb;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(25, 118, 210, 0.05);
  font-family: 'Noto Sans KR', sans-serif;
}

.community-page h2 {
  font-size: 1.6rem;
  font-weight: bold;
  color: #1976d2;
  margin-bottom: 20px;
  text-align: center;
}

.community-page button {
  padding: 8px 16px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-bottom: 20px;
}

.community-page button:hover {
  background-color: #1565c0;
}

.post-list {
  list-style: none;
  padding: 0;
}

.post-list li {
  padding: 16px;
  border: 1px solid #bbdefb;
  border-radius: 8px;
  background-color: #ffffff;
  margin-bottom: 14px;
  transition: background-color 0.2s ease;
  cursor: pointer;
}

.post-list li:hover {
  background-color: #e3f2fd;
}

.post-list h4 {
  margin: 0 0 6px;
  color: #1565c0;
}

.meta {
  font-size: 0.9rem;
  color: #9e9e9e;
}

.sort-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.sort-buttons button {
  padding: 6px 12px;
  background-color: #e3f2fd;
  color: #1976d2;
  border: 1px solid #bbdefb;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.sort-buttons button:hover {
  background-color: #bbdefb;
}

</style>
