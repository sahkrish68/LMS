export const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function getServices() {
    const res = await fetch(`${API_BASE}/api/services`, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Failed to fetch services');
    }
    return res.json();
}
