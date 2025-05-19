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
  padding: 20px;
  background-color: #fff;
}

.meta {
  font-size: 0.9rem;
  color: #666;
}

.content {
  font-size: 1rem;
  line-height: 1.6;
}

.comments {
  margin-top: 30px;
}

.comments textarea {
  width: 100%;
  height: 60px;
  margin-top: 10px;
}

.comments button {
  margin-top: 8px;
}
</style>
