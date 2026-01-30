import React from 'react';
import { render, waitFor } from '@testing-library/react-native';

// 🔹 Mock actions
jest.mock('../../zustand/actions', () => ({
  getAlbumList: jest.fn(),
}));

// 🔹 Mock Zustand store
jest.mock('../../zustand/albums', () => ({
  useAlbumStore: jest.fn(),
}));

import actions from '../../zustand/actions';

import Dashboard from './Dashboard';
import { useAlbumStore } from '../../zustand/albums';

describe('Dashboard Screen', () => {
  const mockNavigate = jest.fn();

  const mockNavigation = {
    navigate: mockNavigate,
  };

  const mockAlbums = [
    {
      wrapperType: 'track',
      trackId: 1,
      artistName: 'Jack Johnson',
      trackName: 'In Concert',
    },
  ];

  beforeEach(() => {
    (useAlbumStore as unknown as jest.Mock).mockReturnValue(mockAlbums);
  });

  it('renders album from store', () => {
    const { getByText } = render(<Dashboard navigation={mockNavigation} />);

    expect(getByText('In Concert')).toBeTruthy();
  });

  it('calls getAlbumList on mount', async () => {
    render(<Dashboard navigation={mockNavigation} />);

    await waitFor(() => {
      expect(actions.getAlbumList).toHaveBeenCalled();
    });
  });
});
