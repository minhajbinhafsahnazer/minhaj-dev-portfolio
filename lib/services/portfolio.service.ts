// lib/services/portfolio.service.ts
import apiClient from '../api/client';

// A simple function to get projects from your backend
export async function getProjects() {
    try {
        // Make GET request to /projects endpoint
        const response = await apiClient.get('/projects');
        return response.data;
    } catch (error: any) {
        // If it's a network error or 404 (feature not yet implemented in backend)
        if (error.code === 'ERR_NETWORK' || error.message === 'Network Error' || error.response?.status === 404) {
            return null; // Signals the component to use fallback
        }
        console.error('Error fetching projects:', error);
        throw error;
    }
}