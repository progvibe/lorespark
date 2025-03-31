export async function fetchHomePagePortraits() {
  const response = await fetch(import.meta.env.VITE_API_URL + "portrait");
  if (!response.ok) {
    throw new Error("Failed to fetch portraits");
  }
  return response.json();
}
