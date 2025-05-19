import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8080', // 백엔드 주소
  withCredentials: true, // 쿠키 기반 로그인 시 필수
})

export default instance
