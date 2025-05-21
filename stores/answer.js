// src/stores/answer.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAnswerStore = defineStore('answer', () => {
  const name = ref('')
  const age = ref(null)
  const height = ref(null)
  const weight = ref(null)

  const healthCategory = ref('')
  const detailSymptoms = ref([])
  const healthConditions = ref([])

  const exercise = ref('')
  const diet = ref('')
  const marketingSource = ref('')

  return {
    name, age, height, weight,
    healthCategory, detailSymptoms, healthConditions,
    exercise, diet, marketingSource
  }
})
