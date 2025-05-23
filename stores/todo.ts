import { defineStore } from 'pinia'
import { useTodos } from '~/composables/useTodoApi'
import type { Todo } from '~/composables/useTodoApi'
import { useRuntimeConfig } from '#app'
import { useAuthStore } from '~/stores/auth'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [] as Todo[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async loadTodos() {
      try {
        const api = useTodos()
        const todos = await api.fetchTodos()
        this.todos = todos
      } catch (error) {
        console.error('Failed to load todos:', error)
        this.todos = []
      }
    },
    async addTodo(text: string) {
      try {
        const api = useTodos()
        const newTodo = await api.addTodo(text)
        if (newTodo) {
          this.todos.unshift(newTodo)
        }
      } catch (error) {
        console.error('Failed to add todo:', error)
        throw error
      }
    },
    async deleteTodo(id: number) {
      try {
        const api = useTodos()
        const success = await api.deleteTodo(id)
        if (success) {
          this.todos = this.todos.filter(t => t.id !== id)
        }
      } catch (error) {
        console.error('Failed to delete todo:', error)
        throw error
      }
    },
    async toggleTodo(id: number) {
      try {
        this.loading = true
        this.error = null
        const todo = this.todos.find(t => t.id === id)
        if (!todo) return

        const config = useRuntimeConfig()
        const auth = useAuthStore()
        
        const response = await fetch(`${config.public.apiBaseUrl}/api/todos/${id}/toggle`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${auth.token}`
          }
        })

        if (!response.ok) {
          throw new Error('Failed to toggle todo')
        }

        const updatedTodo = await response.json()
        const index = this.todos.findIndex(t => t.id === id)
        if (index !== -1) {
          this.todos[index] = updatedTodo
        }
      } catch (error) {
        console.error('Failed to toggle todo:', error)
        this.error = error instanceof Error ? error.message : 'An error occurred'
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})