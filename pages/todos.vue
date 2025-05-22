<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">My Todos</h1>
    <Suspense>
      <template #default>
        <div>
          <div v-if="error" class="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {{ error }}
          </div>
          <LazyTodoForm @add-todo="addTodo" :disabled="loading" />
          <div v-if="loading" class="flex justify-center items-center py-4">
            <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          </div>
          <LazyTodoList v-else :todos="todos" @delete-todo="deleteTodo" />
        </div>
      </template>
      <template #fallback>
        <div class="flex justify-center items-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useTodos } from '~/composables/useTodoApi';

const { todos, loading, error, fetchTodos, addTodo, deleteTodo } = useTodos();

if (process.server) {
  await fetchTodos();
}

onMounted(() => {
  if (todos.value.length === 0) {
    fetchTodos();
  }
});

definePageMeta({
  middleware: ['auth'],
  keepalive: true,
  key: route => route.fullPath
});
</script>