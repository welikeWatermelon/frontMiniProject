<template>
  <div class="community-page">
    <h2>📋 게시판</h2>
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

const fetchPosts = async () => {
  try {
    const res = await axios.get('http://localhost:8080/api/community/posts', {
      headers: {
        Authorization: `Bearer ${token}` // ✅ 토큰 추가
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
  fetchPosts()
})
</script>

<style scoped>
.community-page {
  max-width: 800px;
  margin: 30px auto;
  padding: 20px;
}

.post-list {
  list-style: none;
  padding: 0;
}

.post-list li {
  padding: 15px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
}

.post-list li:hover {
  background-color: #f0f8ff;
}

.meta {
  font-size: 0.9rem;
  color: #666;
}
</style>
