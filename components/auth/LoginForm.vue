<template>
    <form @submit.prevent="handleSubmit" class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
        
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="usernameOrEmail">
                Username or Email
            </label>
            <input
                id="usernameOrEmail"
                v-model="usernameOrEmail"
                type="text"
                required
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter your username or email"
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
            {{ loading ? 'Loading...' : 'Login' }}
        </button>

        <p class="mt-4 text-center text-sm text-gray-600">
            Don't have an account?
            <NuxtLink to="/register" class="text-blue-500 hover:text-blue-600">
                Register here
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

const usernameOrEmail = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

const handleSubmit = async () => {
    try {
        loading.value = true;
        error.value = '';
        await auth.login(usernameOrEmail.value, password.value);
        router.push('/');
    } catch (err: any) {
        error.value = err.message || 'An error occurred during login';
    } finally {
        loading.value = false;
    }
};
</script> 