import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware((to) => {
    const auth = useAuthStore();
    
    // If user is not authenticated and trying to access a protected route
    if (!auth.isAuthenticated && to.path !== '/login' && to.path !== '/register') {
        return navigateTo('/login');
    }
    
    // If user is authenticated and trying to access login/register pages
    if (auth.isAuthenticated && (to.path === '/login' || to.path === '/register')) {
        return navigateTo('/');
    }
}); 