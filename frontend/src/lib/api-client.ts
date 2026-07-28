// const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const BASE_URL = 'https://opportunityhubng.my.to/api/v1';

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  const data = await response.json();
  console.log(data);

  if (!response.ok) {
    throw new Error(data.detail || "Something went wrong");
  }

  return data;
}