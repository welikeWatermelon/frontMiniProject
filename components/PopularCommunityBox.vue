<!-- @/components/PopularCommunityBox.vue -->
<template>
  <section class="community-box">
    <div class="box-header">
      <h3>🔥 커뮤니티 인기 글</h3>
      <RouterLink to="/community" class="more-link">더보기</RouterLink>
    </div>
    <ul>
      <li v-for="post in top5Posts" :key="post.id" @click="goToDetail(post.id)">
        {{ post.title }} <span>💬 {{ post.commentCount }}</span>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const posts = ref([])
const token = localStorage.getItem('token')
const router = useRouter()

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:8080/api/community/posts', {
      headers: { Authorization: `Bearer ${token}` }
    })
    posts.value = res.data
  } catch (err) {
    console.error('인기글 로딩 실패:', err)
  }
})

const top5Posts = computed(() =>
  [...posts.value].sort((a, b) => b.viewCount - a.viewCount).slice(0, 5)
)

const goToDetail = (postId) => {
  router.push(`/community/${postId}`)
}
</script>

<style scoped>
.box-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.more-link {
  font-size: 0.9rem;
  color: #1976d2;
  font-weight: bold;
  text-decoration: none;
}
.more-link:hover {
  text-decoration: underline;
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
  cursor: pointer;
}
.community-box li span {
  color: #1565c0;
  font-weight: bold;
}
.community-box li:hover {
  background-color: #f1f8ff;
}
</style>
