<template>
  <header>
    <nav>
      <RouterLink to="/main">Main</RouterLink> |
      <RouterLink to="/community">Community</RouterLink> |
      <RouterLink to="/calendar">Calendar</RouterLink> |
      <RouterLink to="/notifications">Notifications</RouterLink> |
      <RouterLink to="/badges">Badges</RouterLink> |
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
header {
  background-color: #ffffff;
  border-bottom: 2px solid #90caf9;
  padding: 12px 24px;
  box-shadow: 0 2px 4px rgba(0, 105, 192, 0.05);
}

nav {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

nav a {
  color: #1976d2;
  text-decoration: none;
  font-weight: 500;
  padding: 6px 10px;
  border-radius: 6px;
  transition: background-color 0.2s ease;
}

nav a:hover {
  background-color: #e3f2fd;
}

nav a.router-link-exact-active {
  font-weight: 700;
  color: #1565c0;
  border-bottom: 2px solid #1565c0;
}
</style>