const BASE_URL = '/api/passwords';

export const getPasswords = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error('Failed to fetch passwords');
  return res.json();
};

export const getByType = async (type) => {
  const res = await fetch(`${BASE_URL}/type/${type}`);
  if (!res.ok) throw new Error(`Failed to fetch ${type}`);
  return res.json();
};

export const createPassword = async (data) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create password');
  return res.json();
};

export const updatePassword = async (id, data) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update password');
  return res.json();
};

export const deletePassword = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete password');
};

export const getDeletedPasswords = async () => {
  const res = await fetch(`${BASE_URL}/deleted/all`);
  if (!res.ok) throw new Error('Failed to fetch deleted passwords');
  return res.json();
};

export const restorePassword = async (id) => {
  const res = await fetch(`${BASE_URL}/restore/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Failed to restore password');
  return res.json();
};

export const permanentlyDeletePassword = async (id) => {
  const res = await fetch(`${BASE_URL}/permanent/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to permanently delete password');
};