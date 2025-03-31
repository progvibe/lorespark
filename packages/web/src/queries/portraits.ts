type Portrait = {
  imageUrl: string;
  name: string;
  id: number;
};

export async function fetchHomePagePortraits(): Promise<Portrait[]> {
  const response = await fetch(import.meta.env.VITE_API_URL + "portrait");
  if (!response.ok) {
    throw new Error("Failed to fetch portraits");
  }
  return response.json();
}
