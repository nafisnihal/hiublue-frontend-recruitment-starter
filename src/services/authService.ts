export const loginUser = async (email: string, password: string) => {
  const response = await fetch("https://dummy-1.hiublue.com/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error("Invalid credentials");
  return response.json();
};
