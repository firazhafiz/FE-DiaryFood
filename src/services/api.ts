const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.example.com";

const getHeaders = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const apiRequest = async (endpoint: string, method: string = "GET", body?: any) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: getHeaders(),
      ...(body ? { body: JSON.stringify(body) } : {}),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
};
