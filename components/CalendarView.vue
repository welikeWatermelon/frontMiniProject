<template>
    <div class="calendar-view">
      <h3>{{ log.date }}</h3>
      <ul>
        <li v-for="record in log.records" :key="record.id">
          {{ record.supplement }} - {{ record.amount }}mg ({{ record.time }})
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  defineProps({
    log: {
      type: Object,
      required: true
    }
  })
  </script>
  
  <style scoped>
  .calendar-view {
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 8px;
  }
  
  .calendar-view h3 {
    margin-bottom: 10px;
    color: #2c3e50;
  }
  </style>
  
  
  // components/CommunityPost.vue
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
  
  
  // components/NotificationItem.vue
  <template>
    <li :class="['notification-item', { unread: !item.read }]">
      <p>{{ item.message }}</p>
      <small>{{ item.date }}</small>
    </li>
  </template>
  
  <script setup>
  defineProps({
    item: {
      type: Object,
      required: true
    }
  })
  </script>
  
  <style scoped>
  .notification-item {
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
    margin-bottom: 10px;
    background-color: #fefefe;
  }
  
  .notification-item.unread {
    background-color: #fff8dc;
    font-weight: bold;
  }
  </style>