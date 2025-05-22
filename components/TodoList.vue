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
      <span>{{ todo.text }}</span>
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
interface Todo {
  id: number;
  text: string;
  created_at: string;
}

defineProps<{
  todos: Todo[]
}>();

defineEmits<{
  (e: 'delete-todo', id: number): void
}>();
</script>