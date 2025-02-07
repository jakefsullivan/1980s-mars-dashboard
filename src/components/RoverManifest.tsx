import React, { useState } from 'react';
import styled from 'styled-components';
import { useRoverManifest } from '../hooks/useRoverManifest';
import { useRoverPhotos } from '../hooks/useRoverPhotos';

const ManifestCard = styled.div`
  border: 2px solid ${(props) => props.theme.colors.neonPink};
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 8px;
  text-align: left;
`;

const PhotoGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const Photo = styled.img`
  width: 100%;
  border-radius: 4px;
  object-fit: cover;
`;

interface RoverManifestProps {
  roverName: string;
}

const RoverManifest: React.FC<RoverManifestProps> = ({ roverName }) => {
  const { data, loading, error } = useRoverManifest(roverName);
  const [showPhotos, setShowPhotos] = useState(false);
  const [fetchPhotos, setFetchPhotos] = useState(false);

  const manifest = data?.photo_manifest;

  const maxSol: number = manifest?.max_sol ?? 0;

  const isDeprecatedRover =
    roverName.toLowerCase() === 'opportunity' ||
    roverName.toLowerCase() === 'spirit';

  const shouldFetchPhotos = fetchPhotos && !isDeprecatedRover;

  const {
    photos,
    loading: photosLoading,
    error: photosError,
  } = useRoverPhotos(roverName, maxSol, shouldFetchPhotos);

  if (loading) {
    return <p>Loading {roverName} info...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!manifest) {
    return <p>No data found for {roverName}.</p>;
  }

  return (
    <ManifestCard>
      <h2>{manifest.name}</h2>
      <ul>
        <li>
          <strong>Launch Date:</strong> {manifest.launch_date}
        </li>
        <li>
          <strong>Landing Date:</strong> {manifest.landing_date}
        </li>
        <li>
          <strong>Status:</strong> {manifest.status}
        </li>
        <li>
          <strong>Max Sol:</strong> {manifest.max_sol}
        </li>
        <li>
          <strong>Max Earth Date:</strong> {manifest.max_date}
        </li>
        <li>
          <strong>Total Photos:</strong> {manifest.total_photos}
        </li>
      </ul>
      <button
        onClick={() => {
          setShowPhotos((prev) => !prev);
          setFetchPhotos(true);
        }}
      >
        {showPhotos ? 'Hide Photos' : 'View Photos'}
      </button>

      {showPhotos && (
        <>
          {isDeprecatedRover ? (
            <p>No photos available.</p>
          ) : (
            <>
              {photosLoading && <p>Loading photos...</p>}
              {photosError && <p>Error loading photos: {photosError}</p>}
              {!photosLoading && !photosError && photos.length === 0 && (
                <p>No photos available.</p>
              )}
              {!photosLoading && !photosError && photos.length > 0 && (
                <PhotoGallery>
                  {photos.map((photo) => (
                    <Photo
                      key={photo.id}
                      src={photo.img_src}
                      alt={`Photo ${photo.id} taken on ${photo.earth_date}`}
                    />
                  ))}
                </PhotoGallery>
              )}
            </>
          )}
        </>
      )}
    </ManifestCard>
  );
};

export default RoverManifest;
