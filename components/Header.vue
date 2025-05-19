<template>
  <header>
    <nav>
      <RouterLink to="/main">Main</RouterLink> |
      <RouterLink to="/community">Community</RouterLink> |
      <RouterLink to="/calendar">Calendar</RouterLink> |
      <RouterLink to="/notifications">Notifications</RouterLink> |
      <RouterLink to="/badges">Badges</RouterLink> |
      <RouterLink to="/follows">Follows</RouterLink> |
      <RouterLink to="/my-follows">My Follows</RouterLink> |
      <RouterLink to="/columns">All Columns</RouterLink> |
      <RouterLink to="/columns/new">Write Column</RouterLink> |
      <RouterLink to="/profile">Profile</RouterLink>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
nav {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  background-color: #f2f2f2;
  padding: 10px;
}
</style>