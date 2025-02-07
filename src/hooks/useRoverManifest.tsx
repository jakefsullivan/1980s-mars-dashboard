import { useEffect, useState, useRef } from 'react';

interface PhotoManifest {
  name: string;
  landing_date: string;
  launch_date: string;
  status: string;
  max_sol: number;
  max_date: string;
  total_photos: number;
  photos: Array<{
    sol: number;
    total_photos: number;
    cameras: string[];
  }>;
}

interface RoverResponse {
  photo_manifest?: PhotoManifest;
}

export function useRoverManifest(roverName: string) {
  const [data, setData] = useState<RoverResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    const apiKey = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY';
    const url = `https://api.nasa.gov/mars-photos/api/v1/manifests/${roverName}?api_key=${apiKey}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch manifest for ${roverName}`);
        }
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Error fetching data');
        setLoading(false);
      });
  }, [roverName]);

  return { data, loading, error };
}
