import { useEffect, useState, useRef } from 'react';

export interface RoverPhoto {
  id: number;
  sol: number;
  camera: {
    id: number;
    name: string;
    rover_id: number;
    full_name: string;
  };
  img_src: string;
  earth_date: string;
  rover: {
    id: number;
    name: string;
    landing_date: string;
    launch_date: string;
    status: string;
  };
}

interface RoverPhotosResponse {
  photos: RoverPhoto[];
}

export function useRoverPhotos(
  roverName: string,
  sol: number,
  shouldFetch: boolean
) {
  const [photos, setPhotos] = useState<RoverPhoto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (!shouldFetch || sol <= 0 || hasFetchedRef.current) return;
    hasFetchedRef.current = true;
    setLoading(true);

    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?sol=${sol}&api_key=${import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY'}`;
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch photos for ${roverName}`);
        }
        return res.json();
      })
      .then((data: RoverPhotosResponse) => {
        setPhotos(data.photos);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Error fetching photos');
        setLoading(false);
      });
  }, [roverName, sol, shouldFetch]);

  return { photos, loading, error };
}
