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
    padding: 15px;
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;
    background-color: #fdfdfd;
    border-radius: 6px;
  }
  
  .community-post h3 {
    margin-bottom: 5px;
    color: #2c3e50;
  }
  
  .community-post p {
    margin-bottom: 8px;
  }
  </style>