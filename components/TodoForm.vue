<template>
  <form @submit.prevent="addTodo" class="mb-6">
    <div class="flex gap-2">
      <input
        v-model="newTodo"
        type="text"
        placeholder="New todo"
        class="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add
      </button>
    </div>
  </form>
</template>

<script setup>
const newTodo = ref('')
const todoStore = useTodoStore()

const addTodo = () => {
  if (newTodo.value.trim()) {
    todoStore.addTodo(newTodo.value)
    newTodo.value = ''
  }
}
</script>