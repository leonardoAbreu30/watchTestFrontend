<template>
  <form @submit.prevent="handleSubmit" class="mb-6">
    <div class="flex gap-2">
      <input
        v-model="text"
        type="text"
        placeholder="Add a new todo..."
        class="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        :disabled="disabled"
        required
      />
      <button
        type="submit"
        class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="disabled || !text.trim()"
      >
        {{ disabled ? 'Adding...' : 'Add' }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  disabled?: boolean
}>();

const emit = defineEmits<{
  (e: 'add-todo', text: string): void
}>();

const text = ref('');

const handleSubmit = () => {
  if (text.value.trim() && !props.disabled) {
    emit('add-todo', text.value.trim());
    text.value = '';
  }
};
</script>