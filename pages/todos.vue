<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">My Todos</h1>
    <TodoForm @add-todo="addTodo" />
    <TodoList :todos="todos" @delete-todo="deleteTodo" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth';

const auth = useAuthStore();

interface Todo {
  id: number;
  text: string;
  created_at: string;
}

const todos = ref<Todo[]>([]);

const fetchTodos = async () => {
  try {
    const response = await fetch('http://localhost:4000/api/todos', {
      headers: {
        'Authorization': `Bearer ${auth.token}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    
    todos.value = await response.json();
  } catch (error) {
    console.error('Error fetching todos:', error);
  }
};

const addTodo = async (text: string) => {
  try {
    const response = await fetch('http://localhost:4000/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token}`
      },
      body: JSON.stringify({ text })
    });
    
    if (!response.ok) {
      throw new Error('Failed to add todo');
    }
    
    const newTodo = await response.json();
    todos.value.unshift(newTodo);
  } catch (error) {
    console.error('Error adding todo:', error);
  }
};

const deleteTodo = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:4000/api/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${auth.token}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete todo');
    }
    
    todos.value = todos.value.filter(todo => todo.id !== id);
  } catch (error) {
    console.error('Error deleting todo:', error);
  }
};

onMounted(() => {
  fetchTodos();
});

definePageMeta({
  middleware: ['auth']
});
</script>