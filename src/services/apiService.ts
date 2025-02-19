export const API_BASE_URL = "https://dummy-1.hiublue.com/api";

const getAuthToken = () => {
  return localStorage.getItem("auth_token") || "";
};

export async function fetchData(
  endpoint: string,
  params?: Record<string, string>
) {
  try {
    const url = new URL(`${API_BASE_URL}/${endpoint}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) =>
        url.searchParams.append(key, value)
      );
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
}
