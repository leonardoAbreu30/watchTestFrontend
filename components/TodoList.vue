<template>
  <div class="space-y-4">
    <div v-if="todos.length === 0" class="text-gray-500 text-center py-4">
      No todos yet. Add one above!
    </div>
    <div
      v-for="todo in todos"
      :key="todo.id"
      class="flex items-center justify-between p-4 bg-white rounded-lg shadow"
    >
      <div class="flex items-center gap-3">
        <button
          @click="toggleTodo(todo.id)"
          class="w-5 h-5 border-2 rounded flex items-center justify-center hover:border-blue-500 focus:outline-none"
          :class="{ 'border-blue-500 bg-blue-500': todo.done, 'border-gray-300': !todo.done }"
        >
          <svg
            v-if="todo.done"
            xmlns="http://www.w3.org/2000/svg"
            class="h-3 w-3 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <span :class="{ 'line-through text-gray-500': todo.done }">{{ todo.text }}</span>
      </div>
      <button
        @click="$emit('delete-todo', todo.id)"
        class="text-red-500 hover:text-red-700 focus:outline-none"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Todo } from '~/composables/useTodoApi'
import { useTodoStore } from '~/stores/todo'

const props = defineProps<{
  todos: Todo[]
}>()

defineEmits<{
  (e: 'delete-todo', id: number): void
}>()

const todoStore = useTodoStore()

const toggleTodo = async (id: number) => {
  try {
    await todoStore.toggleTodo(id)
  } catch (error) {
    console.error('Failed to toggle todo:', error)
  }
}
</script>