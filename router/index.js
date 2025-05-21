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
// import PharmacistDetailPage from '@/pages/PharmacistDetailPage.vue'
import ColumnDetailPage from '@/pages/ColumnDetailPage.vue'
import ColumnFormPage from '@/pages/ColumnFormPage.vue'
import AllColumnsPage from '@/pages/AllColumnsPage.vue'
import PharmacistColumnsPage from '@/pages/PharmacistColumnsPage.vue'
import LandigPage from '@/pages/LandigPage.vue'
import PersonalInfoPage from '@/pages/ai/PersonalInfoPage.vue'
import GreetingPage from '@/pages/ai/GreetingPage.vue'
import HealthCategoryPage from '@/pages/ai/HealthCategoryPage.vue'
import HealthDetailQuestionPage from '@/pages/ai/HealthDetailQuestionPage.vue'
import HealthExtraConditionPage from '@/pages/ai/HealthExtraConditionPage.vue'
import LifestyleIntroPage from '@/pages/ai/LifestyleIntroPage.vue'
import LifestyleQuestionPage from '@/pages/ai/LifestyleQuestionPage.vue'
import AnalysisLoadingPage from '@/pages/ai/AnalysisLoadingPage.vue'
import MarketingSurveyPage from '@/pages/ai/MarketingSurveyPage.vue'
import FinalResultPage from '@/pages/ai/FinalResultPage.vue'

const routes = [
  {
  path: '/',
  name: 'Landing',
  component: () => import('@/pages/LandigPage.vue') // 또는 LandingPage.vue
},
{
  path: '/recommend',
  name: 'Recommend',
  component: () => import('@/pages/LandigPage.vue') // 추천 페이지
},
    {
    path: '/home',            // ✅ 이게 꼭 있어야 합니다!!!!
    name: 'home',
    component: MainPage
  },
  { path: '/login', name: 'login', component: LoginPage },
  { path: '/register', name: 'register', component: RegisterPage },
  { path: '/main', name: 'main', component: MainPage },
  { path: '/notifications', name: 'notifications', component: NotificationPage },
  { path: '/badges', name: 'badges', component: BadgePage },
  // { path: '/profile', name: 'profile', component: ProfilePage },
  { path: '/calendar',  name: 'calendar-grid', component: CalendarGridPage},
  { path: '/calendar/:date',name: 'calendar-detail', component: CalendarDetailPage},
  { path: '/community', component: CommunityListPage },
  { path: '/community/new', component: CommunityFormPage },
  { path: '/community/:id', component: CommunityDetailPage },
  {path: '/reload',beforeEnter: (to, from, next) => {
    next('/community')  // 다시 커뮤니티 목록으로 강제 리다이렉트
  }},
  { path: '/my-follows', component: MyFollowListPage },
// { path: '/pharmacists/:id', component: PharmacistDetailPage },
{ path: '/columns', component: AllColumnsPage }, // 전체 칼럼 보기
{
  path: '/columns/:id',
  component: ColumnDetailPage
}, // 칼럼 상세
{ path: '/columns/new', component: ColumnFormPage }, // 칼럼 작성
// 약사의 칼럼들 다 보기
{
  path: '/pharmacist/:id',
  name: 'PharmacistColumns',
  component: PharmacistColumnsPage
},
{ path: '/register', name: 'register', component: RegisterPage },
{
  path: '/users/profile',
  component: ProfilePage
},
{
  path: '/ai/personal-info',
  name: 'PersonalInfo',
  component: PersonalInfoPage
},
{
  path: '/ai/greeting',
  name: 'Greeting',
  component: GreetingPage
},
{
  path: '/ai/health-category',
  name: 'HealthCategory',
  component: HealthCategoryPage
},
{
  path: '/ai/health-detail',
  name: 'HealthDetail',
  component: HealthDetailQuestionPage
},
{
  path: '/ai/health-condition',
  name: 'HealthExtra',
  component: HealthExtraConditionPage
},
{
  path: '/ai/lifestyle-intro',
  name: 'LifestyleIntro',
  component: LifestyleIntroPage
},
{
  path: '/ai/lifestyle-question',
  name: 'LifestyleQuestion',
  component: LifestyleQuestionPage
},
{
  path: '/ai/analysis-loading',
  name: 'AnalysisLoading',
  component: AnalysisLoadingPage
},
{
  path: '/ai/marketing-survey',
  name: 'MarketingSurvey',
  component: MarketingSurveyPage
},
{
  path: '/ai/result',
  name: 'FinalResult',
  component: FinalResultPage
}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
