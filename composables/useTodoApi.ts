import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useRuntimeConfig } from '#app';

export interface Todo {
  id: number;
  text: string;
  done: boolean;
  created_at: string;
}

export function useTodos() {
  const auth = useAuthStore();
  const config = useRuntimeConfig();
  const todos = ref<Todo[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchTodos = async (): Promise<Todo[]> => {
    try {
      loading.value = true;
      error.value = null;
      const response = await fetch(`${config.public.apiBaseUrl}/api/todos`, {
        headers: {
          'Authorization': `Bearer ${auth.token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      
      const data = await response.json();
      todos.value = data;
      return data;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred';
      console.error('Error fetching todos:', err);
      return [];
    } finally {
      loading.value = false;
    }
  };

  const addTodo = async (text: string): Promise<Todo | null> => {
    try {
      loading.value = true;
      error.value = null;
      const response = await fetch(`${config.public.apiBaseUrl}/api/todos`, {
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
      return newTodo;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred';
      console.error('Error adding todo:', err);
      return null;
    } finally {
      loading.value = false;
    }
  };

  const deleteTodo = async (id: number): Promise<boolean> => {
    try {
      loading.value = true;
      error.value = null;
      const response = await fetch(`${config.public.apiBaseUrl}/api/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${auth.token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }
      
      todos.value = todos.value.filter(todo => todo.id !== id);
      return true;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred';
      console.error('Error deleting todo:', err);
      return false;
    } finally {
      loading.value = false;
    }
  };

  return {
    todos,
    loading,
    error,
    fetchTodos,
    addTodo,
    deleteTodo
  };
} 