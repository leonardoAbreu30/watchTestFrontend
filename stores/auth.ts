import { defineStore } from 'pinia';

interface User {
    id: number;
    username: string;
    email: string;
    name: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        user: null,
        token: null,
        isAuthenticated: false
    }),

    actions: {
        async login(usernameOrEmail: string, password: string) {
            try {
                const response = await fetch('http://localhost:4000/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ usernameOrEmail, password }),
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error);
                }

                const data = await response.json();
                this.user = data.user;
                this.token = data.token;
                this.isAuthenticated = true;

                // Store token in localStorage
                localStorage.setItem('auth_token', data.token);
            } catch (error) {
                throw error;
            }
        },

        async register(email: string, password: string, name: string, username: string) {
            try {
                const response = await fetch('http://localhost:4000/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password, name, username }),
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error);
                }

                const data = await response.json();
                this.user = data.user;
                this.token = data.token;
                this.isAuthenticated = true;

                // Store token in localStorage
                localStorage.setItem('auth_token', data.token);
            } catch (error) {
                throw error;
            }
        },

        logout() {
            this.user = null;
            this.token = null;
            this.isAuthenticated = false;
            localStorage.removeItem('auth_token');
        },

        async initAuth() {
            const token = localStorage.getItem('auth_token');
            if (token) {
                try {
                    const response = await fetch('http://localhost:4000/auth/me', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (response.ok) {
                        const user = await response.json();
                        this.user = user;
                        this.token = token;
                        this.isAuthenticated = true;
                    } else {
                        this.logout();
                    }
                } catch (error) {
                    this.logout();
                }
            }
        }
    }
}); 