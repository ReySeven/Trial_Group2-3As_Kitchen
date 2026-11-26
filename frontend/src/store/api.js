const BASE = '/api-backend';

async function request(method, path, body) {
    const opts = {
        method,
        credentials: 'include', 
        headers: { 'Content-Type': 'application/json' },
    };
    if (body !== undefined) opts.body = JSON.stringify(body);

    const res  = await fetch(BASE + path, opts);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Request failed');
    return data;
}

export const api = {
    get:    (path)       => request('GET',    path),
    post:   (path, body) => request('POST',   path, body),
    put:    (path, body) => request('PUT',    path, body),
    patch:  (path, body) => request('PATCH',  path, body),
    delete: (path)       => request('DELETE', path),
};

export async function logout() {
    try {
        await fetch('/api-backend/users/logout', {
            method:      'POST',
            credentials: 'include',
        });
    } catch {
    } finally {
        localStorage.removeItem('3a_kitchen_user');
        localStorage.removeItem('3a_kitchen_role');
        localStorage.removeItem('3a_kitchen_name');
        localStorage.removeItem('3a_kitchen_id');
        localStorage.removeItem('3a_kitchen_rider_id');
        localStorage.removeItem('3a_token');
        sessionStorage.removeItem('3a_cart');
    }
}

export function getUserId()  { return Number(localStorage.getItem('3a_kitchen_id'))        || null; }
export function getRiderId() { return Number(localStorage.getItem('3a_kitchen_rider_id'))  || null; }
