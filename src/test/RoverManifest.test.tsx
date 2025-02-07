import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, expect, describe, afterEach, it } from 'vitest';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import RoverManifest from '../components/RoverManifest';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

vi.mock('../hooks/useRoverManifest', () => {
  return {
    useRoverManifest: vi.fn(),
  };
});

vi.mock('../hooks/useRoverPhotos', () => {
  return {
    useRoverPhotos: vi.fn(() => ({ photos: [], loading: false, error: null })),
  };
});

// mock hooks
import { useRoverManifest } from '../hooks/useRoverManifest';
import { useRoverPhotos } from '../hooks/useRoverPhotos';

describe('RoverManifest Component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should display a loading message when manifest data is loading', () => {
    (useRoverManifest as any).mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });
    (useRoverPhotos as any).mockReturnValue({
      photos: [],
      loading: false,
      error: null,
    });

    renderWithTheme(<RoverManifest roverName="Curiosity" />);
    expect(screen.getByText(/Loading Curiosity info/i)).toBeInTheDocument();
  });

  it('should display an error message when manifest data fails to load', () => {
    (useRoverManifest as any).mockReturnValue({
      data: null,
      loading: false,
      error: 'Manifest error',
    });
    (useRoverPhotos as any).mockReturnValue({
      photos: [],
      loading: false,
      error: null,
    });

    renderWithTheme(<RoverManifest roverName="Curiosity" />);
    expect(screen.getByText(/Error: Manifest error/i)).toBeInTheDocument();
  });

  it('should render manifest details and display photos for a non-deprecated rover', async () => {
    // manifest data for curiosity rover
    const manifestData = {
      photo_manifest: {
        name: 'Curiosity',
        landing_date: '2012-08-06',
        launch_date: '2011-11-26',
        status: 'active',
        max_sol: 1000,
        max_date: '2015-05-30',
        total_photos: 10,
        photos: [{ sol: 1000, total_photos: 10, cameras: ['FHAZ', 'RHAZ'] }],
      },
    };
    (useRoverManifest as any).mockReturnValue({
      data: manifestData,
      loading: false,
      error: null,
    });

    // photo data for curiosity
    const photosData = {
      photos: [
        {
          id: 1,
          sol: 1000,
          camera: {
            id: 20,
            name: 'FHAZ',
            rover_id: 5,
            full_name: 'Front Hazard Avoidance Camera',
          },
          img_src: 'http://example.com/photo1.jpg',
          earth_date: '2015-05-30',
          rover: {
            id: 5,
            name: 'Curiosity',
            landing_date: '2012-08-06',
            launch_date: '2011-11-26',
            status: 'active',
          },
        },
      ],
    };
    (useRoverPhotos as any).mockReturnValue({
      photos: photosData.photos,
      loading: false,
      error: null,
    });

    renderWithTheme(<RoverManifest roverName="Curiosity" />);

    // check if manifest details are rendered
    expect(screen.getByText('Curiosity')).toBeInTheDocument();
    expect(screen.getByText(/Launch Date:/i)).toBeInTheDocument();

    // click the "View Photos" button
    const button = screen.getByRole('button', { name: /View Photos/i });
    fireEvent.click(button);

    // await photo
    await waitFor(() => {
      expect(screen.getByAltText(/Photo 1 taken on/i)).toBeInTheDocument();
    });
  });

  it('should display "No photos available." for a deprecated rover', () => {
    // manifest data for opportunity rover
    const manifestData = {
      photo_manifest: {
        name: 'Opportunity',
        landing_date: '2004-01-25',
        launch_date: '2003-07-07',
        status: 'complete',
        max_sol: 5111,
        max_date: '2018-06-11',
        total_photos: 0,
        photos: [],
      },
    };
    (useRoverManifest as any).mockReturnValue({
      data: manifestData,
      loading: false,
      error: null,
    });

    // for deprecated rovers, useRoverPhotos returns an empty photo list.
    (useRoverPhotos as any).mockReturnValue({
      photos: [],
      loading: false,
      error: null,
    });

    renderWithTheme(<RoverManifest roverName="Opportunity" />);

    // click the "View Photos" button
    const button = screen.getByRole('button', { name: /View Photos/i });
    fireEvent.click(button);

    // check that the "No photos available." message is displayed
    expect(screen.getByText(/No photos available/i)).toBeInTheDocument();
  });
});
