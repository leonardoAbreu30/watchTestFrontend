<template>
    <v-container>
        <h1 class="text-h4 mb-4">Your Todos</h1>
        <TodoForm />
        <TodoList />
    </v-container>
</template>

<script setup>
const todoStore = useTodoStore()

onMounted(async () => {
    console.log('Component mounted, loading todos...')
    await todoStore.loadTodos()
})
</script>