<template>
  <header class="header">
    <div class="header-container">
      <!-- 🔹 좌측: 로고 -->
      <RouterLink to="/main" class="logo-container">
        <img src="@/assets/carebox.png" alt="CareBox 로고" class="carebox-logo" />
      </RouterLink>

      <!-- 🔹 가운데: 메뉴 (항상 한 줄 유지) -->
      <nav class="nav-menu">
        <RouterLink to="/main">Main</RouterLink>
        <RouterLink to="/community">Community</RouterLink>
        <RouterLink to="/calendar">Calendar</RouterLink>
        <RouterLink to="/notifications">Notifications</RouterLink>
        <RouterLink to="/badges">Badges</RouterLink>
        <RouterLink to="/my-follows">My Follows</RouterLink>
        <RouterLink to="/columns">All Columns</RouterLink>
        <RouterLink to="/columns/new">Write Column</RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.header {
  background-color: #ffffff;
  border-bottom: 2px solid #90caf9;
  box-shadow: 0 2px 4px rgba(0, 105, 192, 0.05);
  padding: 12px 24px;
  position: relative;
  height: 64px;
}

.header-container {
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
}

/* 로고: 좌측 고정 */
.logo-container {
  flex-shrink: 0;
}

.carebox-logo {
  height: 48px;
  width: auto;
  cursor: pointer;
}

/* 메뉴: 항상 한 줄로 중앙 정렬 */
.nav-menu {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-wrap: nowrap; /* ❗ 한 줄 유지 */
  gap: 12px;
  font-size: 1rem;
}

/* 링크 스타일 */
.nav-menu a {
  color: #1976d2;
  text-decoration: none;
  font-weight: 500;
  padding: 6px 10px;
  border-radius: 6px;
  transition: background-color 0.2s ease;
  white-space: nowrap; /* 줄바꿈 방지 */
}

.nav-menu a:hover {
  background-color: #e3f2fd;
}

.nav-menu a.router-link-exact-active {
  font-weight: 700;
  color: #1565c0;
  border-bottom: 2px solid #1565c0;
}

/* 🔽 작은 화면 대응: 폰트 크기 축소 */
@media (max-width: 1024px) {
  .nav-menu {
    font-size: 0.9rem;
    gap: 8px;
  }
}

@media (max-width: 768px) {
  .nav-menu {
    font-size: 0.75rem;
    gap: 6px;
  }
}
</style>
