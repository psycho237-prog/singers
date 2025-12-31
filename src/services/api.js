const API_BASE_URL = import.meta.env.VITE_API_URL ||
    (typeof window !== 'undefined' && window.location.hostname !== 'localhost'
        ? '/api'
        : 'http://localhost:3001/api');

// Helper for making API requests
async function apiRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = localStorage.getItem('adminToken');

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token && options.withAuth) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(url, {
            ...options,
            headers,
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'API request failed');
        }

        return data;
    } catch (error) {
        console.error(`API Error [${endpoint}]:`, error);
        throw error;
    }
}

// Public API methods
export const api = {
    // Health check
    health: () => apiRequest('/health'),

    // Categories
    getCategories: () => apiRequest('/categories'),
    getCategory: (id) => apiRequest(`/categories/${id}`),

    // Nominees
    getNominees: (categoryId = null) => {
        const query = categoryId ? `?categoryId=${categoryId}` : '';
        return apiRequest(`/nominees${query}`);
    },
    getNominee: (id) => apiRequest(`/nominees/${id}`),
    getGlobalRankings: () => apiRequest('/nominees/rankings/global'),

    // Votes
    getTotalVotes: () => apiRequest('/votes/total'),

    // Payments
    initiatePayment: (data) => apiRequest('/payments/initiate', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    checkPaymentStatus: (id) => apiRequest(`/payments/status/${id}`),

    // Authentication
    login: (email, password) => apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    }),
    verifyToken: () => apiRequest('/auth/verify', {
        method: 'POST',
        withAuth: true,
    }),

    // Admin (requires authentication)
    admin: {
        getStats: () => apiRequest('/admin/stats', { withAuth: true }),
        getTransactions: (params = {}) => {
            const query = new URLSearchParams(params).toString();
            return apiRequest(`/admin/transactions?${query}`, { withAuth: true });
        },
        getTopNominees: (limit = 10) => apiRequest(`/admin/top-nominees?limit=${limit}`, { withAuth: true }),
        getRecentActivity: (limit = 20) => apiRequest(`/admin/recent-activity?limit=${limit}`, { withAuth: true }),
    },
};

export default api;
