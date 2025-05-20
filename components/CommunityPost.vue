<template>
    <div class="community-post">
      <h3>{{ post.title }}</h3>
      <p>{{ post.content }}</p>
      <small>작성자: {{ post.author }}</small>
    </div>
  </template>
  
  <script setup>
  defineProps({
    post: {
      type: Object,
      required: true
    }
  })
  </script>
  
  <style scoped>
.community-post {
  padding: 18px;
  background-color: #ffffff;              /* 깔끔한 흰 배경 */
  border: 1px solid #bbdefb;              /* 부드러운 파란 테두리 */
  border-radius: 10px;
  margin-bottom: 16px;
  box-shadow: 0 2px 6px rgba(25, 118, 210, 0.08); /* 가벼운 그림자 */
}

.community-post h3 {
  margin-bottom: 8px;
  color: #1976d2;                         /* 제목에 강조된 파란색 */
  font-weight: 600;
  font-size: 1.2rem;
}

.community-post p {
  margin-bottom: 10px;
  color: #333;
  font-size: 1rem;
  line-height: 1.5;
}

.community-post small {
  color: #1565c0;                         /* 작성자 정보는 더 연한 파랑 */
  font-size: 0.85rem;
}

  </style>