import * as ReactNative from 'react-native';

beforeAll(() => {
  jest.spyOn(ReactNative, 'useWindowDimensions').mockReturnValue({
    width: 400,
    height: 800,
    scale: 1,
    fontScale: 1,
  } as any);
});
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AlbumDetails from './AlbumDetails';

describe('AlbumDetails Screen', () => {
  const mockItem = {
    wrapperType: 'track',
    trackId: 1,
    artistName: 'Jack Johnson',
    trackName: 'In Concert',
    artworkUrl100: 'https://example.com/image.jpg',
    primaryGenreName: 'Concert Films',
    trackPrice: 9.99,
    currency: 'USD',
    releaseDate: '2009-01-01T08:00:00Z',
    longDescription: 'Test description',
    previewUrl: 'https://example.com/video.mp4',
  };

  const mockRoute = {
    route: {
      params: {
        item: mockItem,
      },
    },
  };

  it('renders album information correctly', () => {
    const { getByText } = render(<AlbumDetails {...mockRoute} />);

    expect(getByText('In Concert')).toBeTruthy();
    expect(getByText('Jack Johnson')).toBeTruthy();
    expect(getByText('Concert Films')).toBeTruthy();
    expect(getByText('USD 9.99')).toBeTruthy();
    expect(getByText('Test description')).toBeTruthy();
  });

  it('shows play button when previewUrl exists', () => {
    const { getByText } = render(<AlbumDetails {...mockRoute} />);

    expect(getByText('▶ Play Video Preview')).toBeTruthy();
  });

  it('shows video after pressing play button', () => {
    const { getByText, getByTestId } = render(<AlbumDetails {...mockRoute} />);

    fireEvent.press(getByText('▶ Play Video Preview'));

    expect(getByTestId('mock-video')).toBeTruthy();
  });

  it('shows fallback description if none provided', () => {
    const noDescriptionRoute = {
      route: {
        params: {
          item: {
            wrapperType: 'track',
            trackId: 2,
            artistName: 'Artist',
            trackName: 'Album',
          },
        },
      },
    };

    const { getByText } = render(<AlbumDetails {...noDescriptionRoute} />);

    expect(getByText('No description available.')).toBeTruthy();
  });
});
