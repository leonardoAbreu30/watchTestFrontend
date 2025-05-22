import type { Todo } from "~/types/todo"

export const useTodoApi = () => {
  const fetchTodos = async (): Promise<Todo[]> => {
    return await $fetch<Todo[]>('http://localhost:4000/api/todos')
  }

  const addTodo = async (text: string): Promise<Todo> => {
    return await $fetch<Todo>('http://localhost:4000/api/todos', {
      method: 'POST',
      body: { text },
    })
  }

  const deleteTodo = async (id: number): Promise<{ success: boolean }> => {
    return await $fetch(`http://localhost:4000/api/todos/${id}`, {
      method: 'DELETE',
    })
  }

  return { fetchTodos, addTodo, deleteTodo }
}