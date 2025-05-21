import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [] as { id: number; text: string; done: boolean }[],
  }),
  actions: {
    addTodo(text: string) {
      this.todos.push({ 
        id: Date.now(), 
        text, 
        done: false 
      })
    },
    toggleTodo(id: number) {
      const todo = this.todos.find(t => t.id === id)
      if (todo) {
        todo.done = !todo.done
      }
    },
    deleteTodo(id: number) {
      // This creates a NEW array (important for reactivity)
      this.todos = this.todos.filter(todo => todo.id !== id)
    }
  }
})