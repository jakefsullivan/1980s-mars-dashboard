export async function fetchRoverManifest(rover: string) {
  const apiKey = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY';
  const url = `https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${apiKey}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch manifest for rover: ${rover}`);
  }
  return response.json();
}
