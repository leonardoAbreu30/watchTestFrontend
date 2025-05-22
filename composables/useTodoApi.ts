import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';

export interface Todo {
  id: number;
  text: string;
  created_at: string;
}

export function useTodos() {
  const auth = useAuthStore();
  const todos = ref<Todo[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchTodos = async () => {
    try {
      loading.value = true;
      error.value = null;
      const response = await fetch('http://localhost:4000/api/todos', {
        headers: {
          'Authorization': `Bearer ${auth.token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      
      todos.value = await response.json();
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred';
      console.error('Error fetching todos:', err);
    } finally {
      loading.value = false;
    }
  };

  const addTodo = async (text: string) => {
    try {
      loading.value = true;
      error.value = null;
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
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred';
      console.error('Error adding todo:', err);
    } finally {
      loading.value = false;
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      loading.value = true;
      error.value = null;
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
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred';
      console.error('Error deleting todo:', err);
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