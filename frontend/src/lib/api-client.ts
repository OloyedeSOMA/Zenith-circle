// const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const BASE_URL = 'https://opportunityhubng.my.to/api/v1';

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });
  const text = await response.text();
  const data = text ? JSON.parse(text) : {};


  if (!response.ok) {
    let message = "Something went wrong";

    if (data.detail) {
      message = data.detail;
    } else if (data.message) {
      message = data.message;
    } else if (data.non_field_errors) {
      message = Array.isArray(data.non_field_errors)
        ? data.non_field_errors.join(", ")
        : data.non_field_errors;
    } else {
      // Handles validation errors
      const errors = Object.entries(data)
        .map(([field, value]) => {
          if (Array.isArray(value)) {
            return `${field}: ${value.join(", ")}`;
          }

          return `${field}: ${value}`;
        })
        .join("\n");

      if (errors) {
        message = errors;
      }
    }

  throw new Error(message);
  }

  return data;
}