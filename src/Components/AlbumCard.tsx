// components/AlbumCard.tsx

import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';

interface Props {
  item: any;
  onPress: () => void;
}

const AlbumCard: React.FC<Props> = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <FastImage
        source={{
          uri: item.artworkUrl100,
          priority: FastImage.priority.high,
          cache: FastImage.cacheControl.immutable,
        }}
        style={[styles.image]}
      />

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {item.trackName}
        </Text>

        <Text style={styles.artist} numberOfLines={1}>
          {item.artistName}
        </Text>

        <View style={styles.bottomRow}>
          <View style={styles.genreBadge}>
            <Text style={styles.genreText}>{item.primaryGenreName}</Text>
          </View>

          <Text style={styles.price}>
            {item.currency} {item.trackPrice ?? item.collectionPrice}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AlbumCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 4, // Android shadow
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  content: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1c1c1e',
  },
  artist: {
    fontSize: 14,
    color: '#6e6e73',
    marginTop: 4,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  genreBadge: {
    backgroundColor: '#f2f2f7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  genreText: {
    fontSize: 12,
    color: '#333',
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
});
