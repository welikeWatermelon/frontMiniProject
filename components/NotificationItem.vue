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
  padding: 14px;
  border: 1px solid #bbdefb;
  border-radius: 8px;
  margin-bottom: 12px;
  background-color: #ffffff;
  transition: background-color 0.3s ease;
}

.notification-item.unread {
  background-color: #e3f2fd;
  font-weight: 600;
}

.notification-item p {
  margin: 0;
  color: #1976d2;
  font-size: 1rem;
}

.notification-item.unread p {
  color: #1565c0;
}

.notification-item small {
  display: block;
  margin-top: 6px;
  font-size: 0.85rem;
  color: #9e9e9e;
}

  
</style>