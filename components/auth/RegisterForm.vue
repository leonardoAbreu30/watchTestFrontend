<template>
    <form @submit.prevent="handleSubmit" class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-6 text-center">Register</h2>
        
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                Username
            </label>
            <input
                id="username"
                v-model="username"
                type="text"
                required
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter your username"
            >
        </div>

        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                Name
            </label>
            <input
                id="name"
                v-model="name"
                type="text"
                required
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter your name"
            >
        </div>

        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                Email
            </label>
            <input
                id="email"
                v-model="email"
                type="email"
                required
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter your email"
            >
        </div>

        <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                Password
            </label>
            <input
                id="password"
                v-model="password"
                type="password"
                required
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter your password"
            >
        </div>

        <div v-if="error" class="mb-4 text-red-500 text-sm">
            {{ error }}
        </div>

        <button
            type="submit"
            class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none"
            :disabled="loading"
        >
            {{ loading ? 'Loading...' : 'Register' }}
        </button>

        <p class="mt-4 text-center text-sm text-gray-600">
            Already have an account?
            <NuxtLink to="/login" class="text-blue-500 hover:text-blue-600">
                Login here
            </NuxtLink>
        </p>
    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();

const username = ref('');
const name = ref('');
const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

const handleSubmit = async () => {
    try {
        loading.value = true;
        error.value = '';
        await auth.register(email.value, password.value, name.value, username.value);
        router.push('/');
    } catch (err: any) {
        error.value = err.message || 'An error occurred during registration';
    } finally {
        loading.value = false;
    }
};
</script> 