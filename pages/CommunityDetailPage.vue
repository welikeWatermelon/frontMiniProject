<template>
  <div class="detail-page">
    <h2>{{ post.title }}</h2>
    <p class="meta">
      🖋 작성자: {{ post.authorName || '익명' }} <br />
      📅 작성일: {{ formatDate(post.createdAt) }}
    </p>
    <hr />
    <p class="content">{{ post.content }}</p>

    <!-- 댓글 목록 -->
    <section class="comments">
      <h3>💬 댓글</h3>
      <ul>
        <li v-for="comment in comments" :key="comment.id">
          {{ comment.content }} - {{ comment.authorName }}
          <button @click="deleteComment(comment.id)">❌</button>
        </li>
      </ul>
      <textarea v-model="newComment" placeholder="댓글 입력..."></textarea>
      <button @click="submitComment">댓글 등록</button>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const postId = route.params.id
const token = localStorage.getItem('token')

const post = ref({})
const comments = ref([])
const newComment = ref('')

const fetchPost = async () => {
  const res = await axios.get(`http://localhost:8080/api/community/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  post.value = res.data
}

const fetchComments = async () => {
  const res = await axios.get(`http://localhost:8080/api/community/posts/comments/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  comments.value = res.data
}

const submitComment = async () => {
  if (!newComment.value.trim()) return
  await axios.post(`http://localhost:8080/api/community/posts/comments/${postId}`, {
    content: newComment.value
  }, {
    headers: { Authorization: `Bearer ${token}` }
  })
  newComment.value = ''
  fetchComments()
}

const deleteComment = async (commentId) => {
  await axios.delete(`http://localhost:8080/api/community/posts/comments/${postId}/${commentId}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  fetchComments()
}

const formatDate = (dt) => new Date(dt).toLocaleString()

onMounted(() => {
  fetchPost()
  fetchComments()
})
</script>

<style scoped>
.detail-page {
  max-width: 800px;
  margin: 30px auto;
  padding: 24px;
  background-color: #ffffff;
  border: 1px solid #bbdefb;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(25, 118, 210, 0.06);
  font-family: 'Noto Sans KR', sans-serif;
}

.detail-page h2 {
  color: #1976d2;
  margin-bottom: 12px;
  font-size: 1.6rem;
  font-weight: bold;
}

.meta {
  font-size: 0.95rem;
  color: #9e9e9e;
  margin-bottom: 16px;
}

hr {
  border: none;
  border-top: 1px solid #e3f2fd;
  margin: 20px 0;
}

.content {
  font-size: 1rem;
  color: #333;
  line-height: 1.8;
  white-space: pre-line;
}

.comments {
  margin-top: 36px;
  padding: 20px;
  background-color: #e3f2fd;
  border: 1px solid #90caf9;
  border-radius: 10px;
}

.comments h3 {
  color: #1565c0;
  margin-bottom: 14px;
  font-weight: bold;
}

.comments ul {
  list-style: none;
  padding: 0;
  margin-bottom: 12px;
}

.comments li {
  padding: 8px 12px;
  background-color: #ffffff;
  border: 1px solid #bbdefb;
  border-radius: 6px;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #333;
}

.comments textarea {
  width: 100%;
  padding: 10px;
  margin-top: 12px;
  border-radius: 6px;
  border: 1px solid #90caf9;
  box-sizing: border-box;
  resize: vertical;
  font-size: 1rem;
}

.comments button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.comments button:hover {
  background-color: #1565c0;
}

.comments li button {
  background: none;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  color: #f44336;
}

</style>
