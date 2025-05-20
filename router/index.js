import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/pages/LoginPage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'
import MainPage from '@/pages/MainPage.vue'
import NotificationPage from '@/pages/NotificationPage.vue'
import BadgePage from '@/pages/BadgePage.vue'
import ProfilePage from '@/pages/ProfilePage.vue'
import CalendarGridPage from '@/pages/CalendarGridPage.vue'
import CalendarDetailPage from '@/pages/CalendarPage.vue' // ← 기존 상세페이지
import CommunityListPage from '@/pages/CommunityListPage.vue'
import CommunityFormPage from '@/pages/CommunityFormPage.vue'
import CommunityDetailPage from '@/pages/CommunityDetailPage.vue'
// ✅ 새로 만든 페이지 컴포넌트 import
import MyFollowListPage from '@/pages/MyFollowListPage.vue'
import PharmacistDetailPage from '@/pages/PharmacistDetailPage.vue'
import ColumnDetailPage from '@/pages/ColumnDetailPage.vue'
import ColumnFormPage from '@/pages/ColumnFormPage.vue'
import AllColumnsPage from '@/pages/AllColumnsPage.vue'



const routes = [
    {
    path: '/',            // ✅ 이게 꼭 있어야 합니다!!!!
    name: 'home',
    component: MainPage
  },
  { path: '/login', name: 'login', component: LoginPage },
  { path: '/register', name: 'register', component: RegisterPage },
  { path: '/main', name: 'main', component: MainPage },
  { path: '/notifications', name: 'notifications', component: NotificationPage },
  { path: '/badges', name: 'badges', component: BadgePage },
  { path: '/profile', name: 'profile', component: ProfilePage },
  { path: '/calendar',  name: 'calendar-grid', component: CalendarGridPage},
  { path: '/calendar/:date',name: 'calendar-detail', component: CalendarDetailPage},
  { path: '/community', component: CommunityListPage },
  { path: '/community/new', component: CommunityFormPage },
  { path: '/community/:id', component: CommunityDetailPage },
  {path: '/reload',beforeEnter: (to, from, next) => {
    next('/community')  // 다시 커뮤니티 목록으로 강제 리다이렉트
  }},
  { path: '/my-follows', component: MyFollowListPage },
{ path: '/pharmacists/:id', component: PharmacistDetailPage },
{ path: '/columns', component: AllColumnsPage }, // 전체 칼럼 보기
{ path: '/columns/:id', component: ColumnDetailPage }, // 칼럼 상세
{ path: '/columns/new', component: ColumnFormPage } // 칼럼 작성
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
