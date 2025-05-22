import { defineStore } from 'pinia'
import { useTodoApi } from '~/composables/useTodoApi'
import type { Todo } from '~/types/todo'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [] as Todo[],
  }),
  actions: {
    async loadTodos() {
      try {
        const api = useTodoApi()
        this.todos = await api.fetchTodos()
      } catch (error) {
        console.error('Failed to load todos:', error)
        // Optionally reset or handle error state
        this.todos = []
      }
    },
    async addTodo(text: string) {
      try {
        const api = useTodoApi()
        const newTodo = await api.addTodo(text)
        this.todos.unshift(newTodo)
      } catch (error) {
        console.error('Failed to add todo:', error)
        throw error // Re-throw if you want components to handle it
      }
    },
    async deleteTodo(id: number) {
      try {
        console.log("cheguei aqui")
        const api = useTodoApi()
        await api.deleteTodo(id)
        this.todos = this.todos.filter(t => t.id !== id)
      } catch (error) {
        console.error('Failed to delete todo:', error)
        throw error
      }
    },
    toggleTodo(id: number) {
      const todo = this.todos.find(t => t.id === id)
      if (todo) {
        todo.done = !todo.done
      }
    },
  },
})