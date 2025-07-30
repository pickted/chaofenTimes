import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
    history: []
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
    hasHistory: (state) => state.history.length > 0
  },
  actions: {
    increment() {
      this.count++
      this.history.push({
        action: 'increment',
        timestamp: new Date().toISOString()
      })
    },
    decrement() {
      this.count--
      this.history.push({
        action: 'decrement',
        timestamp: new Date().toISOString()
      })
    },
    reset() {
      this.count = 0
      this.history = []
    }
  }
})
