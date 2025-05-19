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